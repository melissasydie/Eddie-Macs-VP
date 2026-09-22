import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';
import { LogOut, Plus, Trash2, Edit2, FileText, Download, Check, AlertCircle, Loader2, Upload } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { downloadPdfFile } from '../utils/downloadPdf';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'specials' | 'categories' | 'items' | 'pdfs'>('specials');
  
  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      <header className="bg-stone-950 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-black uppercase tracking-wider text-red-500" style={{ fontFamily: 'Impact, sans-serif' }}>Eddie Macs CMS</h1>
        <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-4 mb-8 border-b border-stone-300">
          <button 
            className={`pb-4 px-2 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'specials' ? 'border-red-500 text-red-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
            onClick={() => setActiveTab('specials')}
          >
            Daily Specials
          </button>
          <button 
            className={`pb-4 px-2 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'categories' ? 'border-red-500 text-red-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button 
            className={`pb-4 px-2 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'items' ? 'border-red-500 text-red-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
            onClick={() => setActiveTab('items')}
          >
            Menu Items
          </button>
          <button 
            className={`pb-4 px-2 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 ${activeTab === 'pdfs' ? 'border-red-500 text-red-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
            onClick={() => setActiveTab('pdfs')}
          >
            Menu PDF Files
          </button>
        </div>

        {activeTab === 'specials' && <SpecialsManager />}
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'items' && <MenuItemsManager />}
        {activeTab === 'pdfs' && <MenuPdfManager />}
      </div>
    </div>
  );
}

function SpecialsManager() {
  const [specials, setSpecials] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ dayOfWeek: 'MONDAY', title: '', description: '', price: '', colorTheme: 'blue' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'dailySpecials'), (snap) => {
      setSpecials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'dailySpecials'));
    return unsub;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'dailySpecials', editingId), form);
      } else {
        await addDoc(collection(db, 'dailySpecials'), form);
      }
      setForm({ dayOfWeek: 'MONDAY', title: '', description: '', price: '', colorTheme: 'blue' });
      setEditingId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'dailySpecials');
    }
  };

  const handleEdit = (s: any) => {
    setForm({ dayOfWeek: s.dayOfWeek, title: s.title, description: s.description || '', price: s.price, colorTheme: s.colorTheme });
    setEditingId(s.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this special?')) {
      try {
        await deleteDoc(doc(db, 'dailySpecials', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'dailySpecials');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm mb-8 border border-stone-200">
        <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Special' : 'Add New Special'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="border p-2 w-full" value={form.dayOfWeek} onChange={e => setForm({...form, dayOfWeek: e.target.value})} required>
            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'EVERYDAY'].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="border p-2 w-full" value={form.colorTheme} onChange={e => setForm({...form, colorTheme: e.target.value})} required>
            <option value="blue">Blue</option>
            <option value="cyan">Cyan</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="pink">Pink</option>
            <option value="yellow">Yellow</option>
          </select>
          <input className="border p-2 w-full" placeholder="Title (e.g. BUY 1 GET ONE FREE PIZZA)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input className="border p-2 w-full" placeholder="Price (e.g. R99)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <textarea className="border p-2 w-full md:col-span-2" placeholder="Description (Optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-stone-900 text-white px-6 py-2 uppercase font-bold text-sm tracking-wider hover:bg-stone-800 flex items-center gap-2">
            {editingId ? <Edit2 size={16} /> : <Plus size={16} />} {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({ dayOfWeek: 'MONDAY', title: '', description: '', price: '', colorTheme: 'blue' })}} className="px-6 py-2 border text-sm font-bold uppercase tracking-wider">Cancel</button>}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specials.map(s => (
          <div key={s.id} className="bg-white p-4 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-black bg-stone-100 inline-block px-2 py-1 mb-2 text-stone-600">{s.dayOfWeek}</div>
              <h4 className="font-bold uppercase leading-tight mb-1">{s.title}</h4>
              <p className="text-red-600 font-black">{s.price}</p>
              <p className="text-stone-500 text-sm mt-2">{s.description}</p>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 p-2"><Edit2 size={16}/></button>
              <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', order: 0 });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'categories'), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => a.order - b.order));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'categories'));
    return unsub;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'categories', editingId), { ...form, order: Number(form.order) });
      } else {
        await addDoc(collection(db, 'categories'), { ...form, order: Number(form.order) });
      }
      setForm({ name: '', order: 0 });
      setEditingId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'categories');
    }
  };

  const handleEdit = (c: any) => {
    setForm({ name: c.name, order: c.order });
    setEditingId(c.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category?')) {
      try {
        await deleteDoc(doc(db, 'categories', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'categories');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm mb-8 border border-stone-200">
        <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 w-full" placeholder="Category Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="border p-2 w-full" type="number" placeholder="Display Order (e.g. 1)" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} required />
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-stone-900 text-white px-6 py-2 uppercase font-bold text-sm tracking-wider hover:bg-stone-800 flex items-center gap-2">
            {editingId ? <Edit2 size={16} /> : <Plus size={16} />} {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({ name: '', order: 0 })}} className="px-6 py-2 border text-sm font-bold uppercase tracking-wider">Cancel</button>}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.id} className="bg-white p-4 border border-stone-200 shadow-sm flex justify-between items-center">
            <div>
              <span className="text-stone-400 text-sm font-mono mr-2">#{c.order}</span>
              <span className="font-bold uppercase tracking-wide">{c.name}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800 p-2"><Edit2 size={16}/></button>
              <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuItemsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', categoryId: '' });

  useEffect(() => {
    const unsubCats = onSnapshot(collection(db, 'categories'), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => a.order - b.order));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'categories'));
    
    const unsubItems = onSnapshot(collection(db, 'menuItems'), (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'menuItems'));
    
    return () => { unsubCats(); unsubItems(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      alert("Please select a category");
      return;
    }
    try {
      if (editingId) {
        await updateDoc(doc(db, 'menuItems', editingId), form);
      } else {
        await addDoc(collection(db, 'menuItems'), form);
      }
      setForm({ name: '', description: '', price: '', categoryId: form.categoryId }); // keep selected category
      setEditingId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'menuItems');
    }
  };

  const handleEdit = (i: any) => {
    setForm({ name: i.name, description: i.description || '', price: i.price, categoryId: i.categoryId });
    setEditingId(i.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this item?')) {
      try {
        await deleteDoc(doc(db, 'menuItems', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'menuItems');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm mb-8 border border-stone-200">
        <h3 className="font-bold text-lg mb-4">{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 w-full" placeholder="Item Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="border p-2 w-full" placeholder="Price (e.g. R125)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <select className="border p-2 w-full md:col-span-2" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} required>
            <option value="">Select Category...</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <textarea className="border p-2 w-full md:col-span-2" placeholder="Description / Ingredients (Optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-stone-900 text-white px-6 py-2 uppercase font-bold text-sm tracking-wider hover:bg-stone-800 flex items-center gap-2">
            {editingId ? <Edit2 size={16} /> : <Plus size={16} />} {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && <button type="button" onClick={() => {setEditingId(null); setForm({ name: '', description: '', price: '', categoryId: form.categoryId })}} className="px-6 py-2 border text-sm font-bold uppercase tracking-wider">Cancel</button>}
        </div>
      </form>

      <div className="space-y-8">
        {categories.map(c => {
          const catItems = items.filter(i => i.categoryId === c.id);
          if (catItems.length === 0) return null;
          return (
            <div key={c.id}>
              <h3 className="font-black uppercase tracking-wider text-xl mb-4 text-stone-800 border-b-2 border-stone-800 inline-block pb-1">{c.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catItems.map(i => (
                  <div key={i.id} className="bg-white p-4 border border-stone-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold uppercase">{i.name}</h4>
                      <span className="text-red-600 font-bold ml-2">{i.price}</span>
                    </div>
                    <p className="text-stone-500 text-sm mb-4 leading-snug">{i.description}</p>
                    <div className="flex gap-2 pt-4 border-t">
                      <button onClick={() => handleEdit(i)} className="text-blue-600 hover:text-blue-800 p-2"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(i.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MenuPdfManager() {
  const [uploadingMenu, setUploadingMenu] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const pdfMenus = [
    { id: 'main', name: 'Main Menu', file: 'main-menu.pdf', description: 'Breakfast, Steaks, Burgers, Ribs, Seafood, Baskets' },
    { id: 'specials', name: 'Daily Specials', file: 'daily-specials.pdf', description: 'Unbeatable deals Mon-Sun' },
    { id: 'braai', name: 'Braai Packs', file: 'braai-packs.pdf', description: 'Braai packs & functions' },
    { id: 'pizza', name: 'Pizza Menu', file: 'pizza-menu.pdf', description: 'Thin-based wood-fired pizzas' },
    { id: 'treats', name: 'Tasty Treats', file: 'tasty-treats.pdf', description: 'Platters & sharing baskets' },
    { id: 'additional', name: 'Additional Menu Options', file: 'additional-menu-options.pdf', description: 'Function & event catering' },
    { id: 'halfprice', name: 'Wednesday Half-Price', file: 'wednesday-half-price.pdf', description: '50% off Captains Table' },
  ];

  const handleUpload = async (file: File, filename: string, id: string) => {
    setUploadingMenu(id);
    setUploadError(null);
    setUploadSuccess(null);
    try {
      const res = await fetch(`/api/upload-menu-pdf?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/pdf' },
        body: file,
      });
      if (!res.ok) throw new Error('Upload failed');
      setUploadSuccess(id);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (e: any) {
      setUploadError(id);
      setTimeout(() => setUploadError(null), 5000);
    } finally {
      setUploadingMenu(null);
    }
  };

  return (
    <div>
      <div className="bg-white p-6 border border-stone-200 shadow-sm mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-stone-800 mb-2">PDF Menu File Management</h2>
        <p className="text-stone-600 text-sm mb-4">
          Replace or upload your official PDF menus directly here. Uploaded files immediately become available across all "Download PDF" buttons on the website.
        </p>
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          <strong>Tip:</strong> You can also upload PDF files directly using the <strong>File Explorer</strong> in the left sidebar by placing them into the <code className="bg-white px-1.5 py-0.5 border">public/assets/menus/</code> folder.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdfMenus.map(menu => (
          <div key={menu.id} className="bg-white p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-black uppercase tracking-wider text-stone-900">{menu.name}</h3>
                <span className="text-xs font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded">{menu.file}</span>
              </div>
              <p className="text-stone-500 text-xs mb-4">{menu.description}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => downloadPdfFile(`/assets/menus/${menu.file}`, menu.file)}
                className="text-xs text-stone-600 hover:text-red-600 font-bold flex items-center gap-1.5 py-1 px-2 border rounded cursor-pointer"
              >
                <Download size={14} /> Download PDF
              </button>

              <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file, menu.file, menu.id);
                  }}
                />
                {uploadingMenu === menu.id ? (
                  <><Loader2 size={14} className="animate-spin" /> Uploading...</>
                ) : uploadSuccess === menu.id ? (
                  <><Check size={14} className="text-green-300" /> Uploaded!</>
                ) : uploadError === menu.id ? (
                  <><AlertCircle size={14} className="text-amber-300" /> Error</>
                ) : (
                  <><Upload size={14} /> Upload New PDF</>
                )}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

