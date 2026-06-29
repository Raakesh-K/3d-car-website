"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Mail, Image as ImageIcon, Eye, Edit2, X } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"contacts" | "gallery">("contacts");
  
  // Contacts State
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Modals State
  const [viewContact, setViewContact] = useState<any | null>(null);
  const [editContact, setEditContact] = useState<any | null>(null);
  const [deleteContact, setDeleteContact] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', phone: '', service: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Gallery State
  const [images, setImages] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === "contacts") fetchContacts();
    if (activeTab === "gallery") fetchGallery();
  }, [activeTab]);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) setContacts(data.contacts);
    } catch (e) {
      console.error(e);
    }
    setLoadingContacts(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContact) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editContact.id, ...editForm })
      });
      if (res.ok) {
        fetchContacts();
        setEditContact(null);
      }
    } catch (error) {
      console.error(error);
    }
    setIsSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteContact) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/contact?id=${deleteContact.id}`, { method: "DELETE" });
      if (res.ok) {
        fetchContacts();
        setDeleteContact(null);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSaving(false);
  };

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) setImages(data.images);
    } catch (e) {
      console.error(e);
    }
    setLoadingGallery(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchGallery();
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold tracking-wider uppercase transition-colors ${
            activeTab === "contacts" ? "bg-velocity-red text-white" : "text-gray-400 hover:bg-white/5"
          }`}
        >
          <Mail size={18} /> Contacts
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold tracking-wider uppercase transition-colors ${
            activeTab === "gallery" ? "bg-velocity-red text-white" : "text-gray-400 hover:bg-white/5"
          }`}
        >
          <ImageIcon size={18} /> Gallery
        </button>
      </div>

      {/* Contacts Tab */}
      {activeTab === "contacts" && (
        <div className="bg-neutral-900 rounded-xl border border-white/10 overflow-hidden">
          {loadingContacts ? (
            <div className="p-8 text-center text-gray-400 animate-pulse">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No contact submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/50 text-gray-400 uppercase text-xs tracking-widest">
                    <th className="p-4 border-b border-white/10">Date</th>
                    <th className="p-4 border-b border-white/10">Name</th>
                    <th className="p-4 border-b border-white/10">Phone</th>
                    <th className="p-4 border-b border-white/10">Service</th>
                    <th className="p-4 border-b border-white/10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                      <td className="p-4 text-gray-400 text-sm whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4 text-gray-300">{c.phone}</td>
                      <td className="p-4">
                        <span className="bg-velocity-red/20 text-velocity-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {c.service}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewContact(c)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setEditContact(c);
                              setEditForm({ name: c.name, phone: c.phone, service: c.service });
                            }}
                            className="p-2 text-blue-400 hover:text-white hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="Edit Contact"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteContact(c)}
                            className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Delete Contact"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div>
          <div className="mb-8 p-6 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-widest mb-1">Upload New Image</h2>
              <p className="text-sm text-gray-400">Add high-resolution images to the public showroom gallery.</p>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
                id="gallery-upload"
              />
              <label
                htmlFor="gallery-upload"
                className={`flex items-center gap-2 px-6 py-3 bg-velocity-red text-white font-bold uppercase tracking-widest rounded-lg cursor-pointer hover:bg-red-600 transition-colors ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload size={20} />
                {uploading ? "Uploading..." : "Upload Image"}
              </label>
            </div>
          </div>

          {loadingGallery ? (
            <div className="text-center text-gray-400 p-8 animate-pulse">Loading gallery...</div>
          ) : images.length === 0 ? (
            <div className="text-center text-gray-400 p-8 bg-neutral-900 border border-white/10 rounded-xl">
              No images uploaded yet. The frontend will show defaults.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img) => (
                <div key={img.id} className="group relative aspect-[4/3] bg-black rounded-xl overflow-hidden border border-white/10">
                  <Image src={img.url} alt={img.altText || "Gallery image"} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-white truncate">{img.altText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View Modal */}
      {viewContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-white/10 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setViewContact(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white border-b border-white/10 pb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Name</p>
                <p className="text-lg font-medium">{viewContact.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Phone</p>
                <p className="text-lg text-gray-300">{viewContact.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Service Requested</p>
                <p className="text-lg text-velocity-red font-bold uppercase">{viewContact.service}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Submitted On</p>
                <p className="text-sm text-gray-400">
                  {new Date(viewContact.createdAt).toLocaleDateString()} at {new Date(viewContact.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button onClick={() => setViewContact(null)} className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-white/10 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setEditContact(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white border-b border-white/10 pb-4">Edit Contact</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-velocity-red transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-velocity-red transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Service</label>
                <select
                  value={editForm.service}
                  onChange={e => setEditForm({ ...editForm, service: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-velocity-red transition-colors"
                  required
                >
                  <option value="buy">Buy</option>
                  <option value="lease">Lease</option>
                  <option value="test-drive">Test Drive</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>
              <div className="flex gap-4 mt-8 pt-4">
                <button type="button" onClick={() => setEditContact(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="flex-1 py-3 bg-velocity-red hover:bg-red-600 text-white rounded-lg font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-red-500/30 rounded-xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <div className="mx-auto bg-red-500/10 text-red-500 w-16 h-16 flex items-center justify-center rounded-full mb-6">
              <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">Delete Contact?</h3>
            <p className="text-gray-400 mb-8">Are you sure you want to permanently delete the contact request from <span className="text-white font-bold">{deleteContact.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteContact(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={isSaving} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                {isSaving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
