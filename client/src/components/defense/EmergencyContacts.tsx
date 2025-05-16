import { useState } from 'react';
import { Phone, User, Edit, AlertTriangle, Plus, X, ChevronRight } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  type: 'personal' | 'emergency' | 'medical';
  notes?: string;
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '(555) 123-4567',
      relationship: 'Spouse',
      type: 'personal',
      notes: 'Primary emergency contact'
    },
    {
      id: '2',
      name: 'City Police Department',
      phone: '(555) 911',
      relationship: 'Law Enforcement',
      type: 'emergency'
    },
    {
      id: '3',
      name: 'Dr. Sarah Wilson',
      phone: '(555) 789-0123',
      relationship: 'Primary Care Physician',
      type: 'medical',
      notes: 'Available for after-hours emergencies'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState<Partial<EmergencyContact>>({
    type: 'personal'
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.type) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          name: newContact.name,
          phone: newContact.phone,
          relationship: newContact.relationship || '',
          type: newContact.type,
          notes: newContact.notes
        }
      ]);
      setNewContact({ type: 'personal' });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getTypeColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'personal':
        return 'bg-blue-100 text-blue-700';
      case 'emergency':
        return 'bg-red-100 text-red-700';
      case 'medical':
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Emergency Contacts</h2>
        <p className="text-blue-100 mb-4">
          Manage your emergency contacts for quick access during critical situations.
        </p>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </button>
      </div>

      {/* Add Contact Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Add Emergency Contact</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Type
              </label>
              <select
                value={newContact.type}
                onChange={(e) => setNewContact({ ...newContact, type: e.target.value as EmergencyContact['type'] })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="personal">Personal Contact</option>
                <option value="emergency">Emergency Services</option>
                <option value="medical">Medical Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={newContact.name || ''}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter contact name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newContact.phone || ''}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <input
                type="text"
                value={newContact.relationship || ''}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Spouse, Doctor, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={newContact.notes || ''}
                onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Add any additional notes"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map(contact => (
          <div
            key={contact.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-gray-900 mr-2">{contact.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(contact.type)}`}>
                    {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">{contact.relationship}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  {contact.phone}
                </div>
                {contact.notes && (
                  <p className="mt-2 text-sm text-gray-500 italic">{contact.notes}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {/* Handle edit */}}
                  className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Instructions */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800 mb-1">Emergency Instructions</h3>
            <p className="text-sm text-red-700">
              In case of emergency, these contacts will be notified automatically when you trigger an SOS alert. 
              Make sure to keep your emergency contacts up to date and verify their information regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;