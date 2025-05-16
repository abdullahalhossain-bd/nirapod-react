import { useState, useEffect } from 'react';
import { 
  Phone, 
  Plus, 
  Edit2, 
  Trash2, 
  Share2, 
  MapPin, 
  AlertTriangle, 
  Check, 
  X, 
  Save,
  Download,
  Search,
  ChevronDown,
  Filter,
  Bell,
  User,
  Users,
  Shield,
  Heart,
  Clock,
  Printer,
  Copy,
  Smartphone,
  MessageSquare,
  Star
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  relationship?: string;
  type: 'personal' | 'emergency' | 'medical' | 'work' | 'other';
  notes?: string;
  isSharing?: boolean;
  isFavorite?: boolean;
  lastContacted?: string;
}

interface ContactGroup {
  id: string;
  name: string;
  description?: string;
  contacts: string[]; // IDs of contacts in this group
  color?: string;
  isEmergency?: boolean;
}

// Sample data
const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john@example.com',
    address: '123 Main St, Anytown, USA',
    relationship: 'Spouse',
    type: 'personal',
    notes: 'Primary emergency contact',
    isSharing: true,
    isFavorite: true,
    lastContacted: '2025-04-01'
  },
  {
    id: '2',
    name: 'Dr. Sarah Williams',
    phone: '(555) 987-6543',
    email: 'dr.williams@medcenter.com',
    address: '456 Health Ave, Anytown, USA',
    relationship: 'Primary Physician',
    type: 'medical',
    notes: 'Office hours: Mon-Fri 9am-5pm',
    isFavorite: true,
    lastContacted: '2025-03-15'
  },
  {
    id: '3',
    name: 'Anytown Police Department',
    phone: '(555) 911-0000',
    address: '789 Justice Blvd, Anytown, USA',
    type: 'emergency',
    notes: 'Non-emergency number, for emergencies dial 911',
    lastContacted: null
  },
  {
    id: '4',
    name: 'Mary Johnson',
    phone: '(555) 234-5678',
    email: 'mary@example.com',
    relationship: 'Neighbor',
    type: 'personal',
    notes: 'Has spare key to house',
    isSharing: true,
    lastContacted: '2025-03-25'
  },
  {
    id: '5',
    name: 'Anytown General Hospital',
    phone: '(555) 867-5309',
    address: '101 Medical Center Drive, Anytown, USA',
    type: 'medical',
    notes: 'Emergency room open 24/7',
    lastContacted: null
  },
  {
    id: '6',
    name: 'Robert Wilson',
    phone: '(555) 345-6789',
    email: 'robert@company.com',
    relationship: 'Manager',
    type: 'work',
    notes: '',
    lastContacted: '2025-03-10'
  }
];

const sampleGroups: ContactGroup[] = [
  {
    id: '1',
    name: 'Emergency Contacts',
    description: 'People to contact in case of emergency',
    contacts: ['1', '3', '5'],
    color: 'red',
    isEmergency: true
  },
  {
    id: '2',
    name: 'Family',
    description: 'Close family members',
    contacts: ['1'],
    color: 'blue'
  },
  {
    id: '3',
    name: 'Medical',
    description: 'Healthcare providers',
    contacts: ['2', '5'],
    color: 'green'
  },
  {
    id: '4',
    name: 'Neighbors',
    description: 'People living nearby',
    contacts: ['4'],
    color: 'purple'
  }
];

export const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [groups, setGroups] = useState<ContactGroup[]>(sampleGroups);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ContactGroup | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState<Contact | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroup, setNewGroup] = useState<Omit<ContactGroup, 'id'>>({
    name: '',
    description: '',
    contacts: [],
    color: 'blue'
  });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [view, setView] = useState<'contacts' | 'groups' | 'emergency'>('contacts');
  
  // For new contact form
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    phone: '',
    email: '',
    address: '',
    relationship: '',
    type: 'personal',
    notes: ''
  });
  
  // Reset form when closing
  useEffect(() => {
    if (!showAddContact) {
      setNewContact({
        name: '',
        phone: '',
        email: '',
        address: '',
        relationship: '',
        type: 'personal',
        notes: ''
      });
    }
    
    if (!showAddGroup) {
      setNewGroup({
        name: '',
        description: '',
        contacts: [],
        color: 'blue'
      });
    }
  }, [showAddContact, showAddGroup]);
  
  const handleSaveContact = () => {
    // Validate required fields
    if (!newContact.name || !newContact.phone) {
      alert('Name and phone number are required');
      return;
    }
    
    // Create new contact with ID
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString(),
      lastContacted: null
    };
    
    setContacts([...contacts, contact]);
    setShowAddContact(false);
  };
  
  const handleSaveGroup = () => {
    // Validate required fields
    if (!newGroup.name) {
      alert('Group name is required');
      return;
    }
    
    // Create new group with ID
    const group: ContactGroup = {
      ...newGroup,
      id: Date.now().toString()
    };
    
    setGroups([...groups, group]);
    setShowAddGroup(false);
  };
  
  const handleUpdateContact = () => {
    if (!editedContact) return;
    
    // Update contact in list
    setContacts(contacts.map(c => c.id === editedContact.id ? editedContact : c));
    setSelectedContact(editedContact);
    setIsEditing(false);
  };
  
  const handleDeleteContact = (id: string) => {
    // Update groups to remove this contact
    const updatedGroups = groups.map(group => ({
      ...group,
      contacts: group.contacts.filter(contactId => contactId !== id)
    }));
    
    setGroups(updatedGroups);
    setContacts(contacts.filter(c => c.id !== id));
    setSelectedContact(null);
  };
  
  const handleToggleFavorite = (id: string) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    ));
    
    if (selectedContact?.id === id) {
      setSelectedContact({
        ...selectedContact,
        isFavorite: !selectedContact.isFavorite
      });
    }
  };
  
  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(g => g.id !== id));
    setSelectedGroup(null);
  };
  
  const handleAddContactToGroup = (contactId: string, groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId && !group.contacts.includes(contactId)
        ? { ...group, contacts: [...group.contacts, contactId] }
        : group
    ));
    
    if (selectedGroup?.id === groupId) {
      setSelectedGroup({
        ...selectedGroup,
        contacts: [...selectedGroup.contacts, contactId]
      });
    }
  };
  
  const handleRemoveContactFromGroup = (contactId: string, groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId
        ? { ...group, contacts: group.contacts.filter(id => id !== contactId) }
        : group
    ));
    
    if (selectedGroup?.id === groupId) {
      setSelectedGroup({
        ...selectedGroup,
        contacts: selectedGroup.contacts.filter(id => id !== contactId)
      });
    }
  };
  
  const handleSendEmergencyAlert = () => {
    setEmergencyMode(true);
    
    // In a real app, this would trigger actual alerts
    setTimeout(() => {
      alert('Emergency alerts have been sent to your emergency contacts. They have been notified of your situation and location.');
      setEmergencyMode(false);
    }, 2000);
  };
  
  const filterContacts = (contacts: Contact[]) => {
    if (!searchQuery) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      (contact.email && contact.email.toLowerCase().includes(query)) ||
      (contact.relationship && contact.relationship.toLowerCase().includes(query)) ||
      (contact.notes && contact.notes.toLowerCase().includes(query))
    );
  };
  
  const filteredContacts = filterContacts(contacts);
  
  const typeIcons = {
    personal: User,
    emergency: AlertTriangle,
    medical: Heart,
    work: Smartphone,
    other: User
  };
  
  const typeColors = {
    personal: 'bg-blue-100 text-blue-800',
    emergency: 'bg-red-100 text-red-800',
    medical: 'bg-green-100 text-green-800',
    work: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800'
  };
  
  // Contact list component
  const ContactList = () => (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">Contacts</h2>
        <button 
          onClick={() => setShowAddContact(true)}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Contact
        </button>
      </div>
      
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No contacts found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map(contact => {
              const TypeIcon = typeIcons[contact.type];
              
              return (
                <div 
                  key={contact.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        contact.type === 'personal' ? 'bg-blue-100' :
                        contact.type === 'emergency' ? 'bg-red-100' :
                        contact.type === 'medical' ? 'bg-green-100' :
                        contact.type === 'work' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <TypeIcon className={`w-5 h-5 ${
                          contact.type === 'personal' ? 'text-blue-600' :
                          contact.type === 'emergency' ? 'text-red-600' :
                          contact.type === 'medical' ? 'text-green-600' :
                          contact.type === 'work' ? 'text-yellow-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      </div>
                    </div>
                    {contact.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
  
  // Contact details component
  const ContactDetails = () => {
    if (!selectedContact) {
      return (
        <div className="h-full border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500 max-w-xs mx-auto p-6">
            <Phone className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Contact Selected</h3>
            <p className="text-sm">Select a contact from the list to view details, or add a new contact</p>
          </div>
        </div>
      );
    }
    
    const contactGroups = groups.filter(group => 
      group.contacts.includes(selectedContact.id)
    );
    
    const TypeIcon = typeIcons[selectedContact.type];
    
    return (
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Contact Details</h2>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-600 hover:text-gray-700 p-1 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleUpdateContact}
                  className="text-green-600 hover:text-green-700 p-1 rounded"
                >
                  <Save className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setEditedContact(selectedContact);
                    setIsEditing(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 p-1 rounded"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteContact(selectedContact.id)}
                  className="text-red-600 hover:text-red-700 p-1 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedContact?.name || ''}
                  onChange={(e) => setEditedContact(prev => prev ? {...prev, name: e.target.value} : null)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedContact?.phone || ''}
                  onChange={(e) => setEditedContact(prev => prev ? {...prev, phone: e.target.value} : null)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedContact?.email || ''}
                  onChange={(e) => setEditedContact(prev => prev ? {...prev, email: e.target.value} : null)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedContact?.address || ''}
                  onChange={(e) => setEditedContact(prev => prev ? {...prev, address: e.target.value} : null)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedContact?.relationship || ''}
                  onChange={(e) => setEditedContact(prev => prev ? {...prev, relationship: e.target.value} : null)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editedContact?.type || 'personal'}
                  onChange={(e) => setEditedContact(prev => prev ? {
                    ...prev, 
                    type: e.target.value as any
                  } : null)}
                >
                  <option value="personal">Personal</option>
                  <option value="emergency">Emergency</option>
                  <option value="medical">Medical</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  value={editedContact?.notes || ''}
                  onChange={(e) => setEditedContact(prev => prev ? {...prev, notes: e.target.value} : null)}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={editedContact?.isFavorite || false}
                  onChange={(e) => setEditedContact(prev => prev ? {
                    ...prev,
                    isFavorite: e.target.checked
                  } : null)}
                  className="mr-2"
                />
                <label htmlFor="favorite" className="text-sm text-gray-700">
                  Mark as favorite
                </label>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedContact.type === 'personal' ? 'bg-blue-100' :
                    selectedContact.type === 'emergency' ? 'bg-red-100' :
                    selectedContact.type === 'medical' ? 'bg-green-100' :
                    selectedContact.type === 'work' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <TypeIcon className={`w-6 h-6 ${
                      selectedContact.type === 'personal' ? 'text-blue-600' :
                      selectedContact.type === 'emergency' ? 'text-red-600' :
                      selectedContact.type === 'medical' ? 'text-green-600' :
                      selectedContact.type === 'work' ? 'text-yellow-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h3>
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[selectedContact.type]}`}>
                        {selectedContact.type.charAt(0).toUpperCase() + selectedContact.type.slice(1)}
                      </span>
                      {selectedContact.relationship && (
                        <span className="text-sm text-gray-600 ml-2">({selectedContact.relationship})</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFavorite(selectedContact.id)}
                  className={`p-1.5 rounded-full ${
                    selectedContact.isFavorite 
                      ? 'text-yellow-500 hover:text-yellow-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Star 
                    className="w-5 h-5" 
                    fill={selectedContact.isFavorite ? 'currentColor' : 'none'} 
                  />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Phone</h4>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedContact.phone}</p>
                    <div className="flex space-x-1">
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {selectedContact.email && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Email</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-900">{selectedContact.email}</p>
                    </div>
                  </div>
                )}
                
                {selectedContact.address && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Address</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-900">{selectedContact.address}</p>
                    </div>
                  </div>
                )}
                
                {selectedContact.notes && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">Notes</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-900">{selectedContact.notes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">Groups</h4>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Manage
                  </button>
                </div>
                
                {contactGroups.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Not in any groups</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {contactGroups.map(group => (
                      <div 
                        key={group.id}
                        className={`px-3 py-1 text-sm rounded-full ${
                          group.isEmergency ? 'bg-red-100 text-red-700' :
                          group.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          group.color === 'green' ? 'bg-green-100 text-green-700' :
                          group.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                          group.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {group.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">Actions</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </button>
                  <button className="flex items-center justify-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Contact
                  </button>
                  {selectedContact.type === 'emergency' && (
                    <button className="flex items-center justify-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Groups list component
  const GroupsList = () => (
    <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">Contact Groups</h2>
        <button 
          onClick={() => setShowAddGroup(true)}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Group
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {groups.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No groups found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {groups.map(group => (
              <div 
                key={group.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedGroup?.id === group.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedGroup(group)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      group.isEmergency ? 'bg-red-100' :
                      group.color === 'blue' ? 'bg-blue-100' :
                      group.color === 'green' ? 'bg-green-100' :
                      group.color === 'purple' ? 'bg-purple-100' :
                      group.color === 'yellow' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <Users className={`w-5 h-5 ${
                        group.isEmergency ? 'text-red-600' :
                        group.color === 'blue' ? 'text-blue-600' :
                        group.color === 'green' ? 'text-green-600' :
                        group.color === 'purple' ? 'text-purple-600' :
                        group.color === 'yellow' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{group.name}</h3>
                      <p className="text-xs text-gray-500">{group.contacts.length} contacts</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  // Group details component
  const GroupDetails = () => {
    if (!selectedGroup) {
      return (
        <div className="h-full border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
          <div className="text-center text-gray-500 max-w-xs mx-auto p-6">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Group Selected</h3>
            <p className="text-sm">Select a group from the list to view details, or create a new group</p>
          </div>
        </div>
      );
    }
    
    const groupContacts = contacts.filter(contact => 
      selectedGroup.contacts.includes(contact.id)
    );
    
    const notInGroup = contacts.filter(contact => 
      !selectedGroup.contacts.includes(contact.id)
    );
    
    return (
      <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Group Details</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDeleteGroup(selectedGroup.id)}
              className="text-red-600 hover:text-red-700 p-1 rounded"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                selectedGroup.isEmergency ? 'bg-red-100' :
                selectedGroup.color === 'blue' ? 'bg-blue-100' :
                selectedGroup.color === 'green' ? 'bg-green-100' :
                selectedGroup.color === 'purple' ? 'bg-purple-100' :
                selectedGroup.color === 'yellow' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <Users className={`w-6 h-6 ${
                  selectedGroup.isEmergency ? 'text-red-600' :
                  selectedGroup.color === 'blue' ? 'text-blue-600' :
                  selectedGroup.color === 'green' ? 'text-green-600' :
                  selectedGroup.color === 'purple' ? 'text-purple-600' :
                  selectedGroup.color === 'yellow' ? 'text-yellow-600' :
                  'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedGroup.name}</h3>
                {selectedGroup.isEmergency && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    Emergency Group
                  </span>
                )}
              </div>
            </div>
            
            {selectedGroup.description && (
              <p className="text-gray-700 mb-4">{selectedGroup.description}</p>
            )}
            
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{groupContacts.length} contacts in this group</span>
              
              <div className="flex space-x-2">
                <button className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message All
                </button>
                {selectedGroup.isEmergency && (
                  <button className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Emergency Alert
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Contacts in this Group</h3>
            
            {groupContacts.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No contacts in this group yet</p>
            ) : (
              <div className="space-y-2">
                {groupContacts.map(contact => (
                  <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        contact.type === 'personal' ? 'bg-blue-100' :
                        contact.type === 'emergency' ? 'bg-red-100' :
                        contact.type === 'medical' ? 'bg-green-100' :
                        contact.type === 'work' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {typeIcons[contact.type] && React.createElement(typeIcons[contact.type], {
                          className: `w-4 h-4 ${
                            contact.type === 'personal' ? 'text-blue-600' :
                            contact.type === 'emergency' ? 'text-red-600' :
                            contact.type === 'medical' ? 'text-green-600' :
                            contact.type === 'work' ? 'text-yellow-600' : 'text-gray-600'
                          }`
                        })}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-xs text-gray-600">{contact.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveContactFromGroup(contact.id, selectedGroup.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {notInGroup.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Add Contacts to Group</h3>
              
              <div className="space-y-2">
                {notInGroup.map(contact => (
                  <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        contact.type === 'personal' ? 'bg-blue-100' :
                        contact.type === 'emergency' ? 'bg-red-100' :
                        contact.type === 'medical' ? 'bg-green-100' :
                        contact.type === 'work' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {typeIcons[contact.type] && React.createElement(typeIcons[contact.type], {
                          className: `w-4 h-4 ${
                            contact.type === 'personal' ? 'text-blue-600' :
                            contact.type === 'emergency' ? 'text-red-600' :
                            contact.type === 'medical' ? 'text-green-600' :
                            contact.type === 'work' ? 'text-yellow-600' : 'text-gray-600'
                          }`
                        })}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-xs text-gray-600">{contact.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddContactToGroup(contact.id, selectedGroup.id)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Emergency alert component
  const EmergencyAlertPage = () => {
    // Get emergency contacts
    const emergencyGroups = groups.filter(group => group.isEmergency);
    const emergencyContactIds = new Set<string>();
    
    emergencyGroups.forEach(group => {
      group.contacts.forEach(id => emergencyContactIds.add(id));
    });
    
    const emergencyContacts = contacts.filter(contact => 
      emergencyContactIds.has(contact.id) || contact.type === 'emergency'
    );
    
    return (
      <div className="bg-white rounded-lg shadow-lg border border-red-200 overflow-hidden">
        <div className="bg-red-600 p-5 text-white">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">Emergency Alert System</h2>
          </div>
          <p className="mt-2 text-red-100">
            This system allows you to quickly notify your emergency contacts in case of an emergency situation.
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Emergency Contacts</h3>
            
            {emergencyContacts.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-800 font-medium mb-1">No Emergency Contacts Set Up</h4>
                    <p className="text-sm text-yellow-700">
                      You don't have any emergency contacts configured. Add contacts to the emergency group or set contact type to "emergency".
                    </p>
                    <button 
                      className="mt-2 text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded"
                      onClick={() => setView('contacts')}
                    >
                      Add Emergency Contacts
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {emergencyContacts.map(contact => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      </div>
                    </div>
                    <div>
                      {contact.isSharing ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Location sharing enabled
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          No location sharing
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Alert Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Share Location with Alert</p>
                    <p className="text-sm text-gray-600">Include your current location with emergency alerts</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={shareLocation}
                    onChange={() => setShareLocation(!shareLocation)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Emergency Message</h4>
                <p className="text-sm text-gray-600 mb-3">
                  This message will be sent to all your emergency contacts when you trigger an alert.
                </p>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                  rows={3}
                  defaultValue="I need help. This is an emergency alert sent from my safety app."
                ></textarea>
                <div className="flex justify-end">
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Restore Default
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleSendEmergencyAlert}
              disabled={emergencyContacts.length === 0 || emergencyMode}
              className={`inline-flex items-center justify-center bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold ${
                emergencyContacts.length === 0 || emergencyMode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
              } transition-colors relative overflow-hidden`}
            >
              {emergencyMode ? (
                <>
                  <div className="absolute inset-0 bg-red-800 animate-pulse"></div>
                  <span className="relative flex items-center">
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Sending Alert...
                  </span>
                </>
              ) : (
                <span className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Send Emergency Alert
                </span>
              )}
            </button>
            
            <p className="mt-2 text-sm text-gray-500">
              Use only in case of emergency
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Add Contact Modal
  const AddContactModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Add New Contact</h2>
          <button 
            onClick={() => setShowAddContact(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newContact.phone}
              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newContact.email}
              onChange={(e) => setNewContact({...newContact, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newContact.address}
              onChange={(e) => setNewContact({...newContact, address: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newContact.relationship}
              onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              placeholder="E.g., Spouse, Friend, Doctor"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Type
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newContact.type}
              onChange={(e) => setNewContact({
                ...newContact, 
                type: e.target.value as any
              })}
            >
              <option value="personal">Personal</option>
              <option value="emergency">Emergency</option>
              <option value="medical">Medical</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={3}
              value={newContact.notes}
              onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
              placeholder="Any additional information about this contact"
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowAddContact(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveContact}
            disabled={!newContact.name || !newContact.phone}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              !newContact.name || !newContact.phone
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            } transition-colors`}
          >
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
  
  // Add Group Modal
  const AddGroupModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Create New Group</h2>
          <button 
            onClick={() => setShowAddGroup(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newGroup.name}
              onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={3}
              value={newGroup.description}
              onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
              placeholder="Optional description for this group"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Color
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={newGroup.color}
              onChange={(e) => setNewGroup({...newGroup, color: e.target.value})}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isEmergency"
              checked={newGroup.isEmergency}
              onChange={(e) => setNewGroup({...newGroup, isEmergency: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="isEmergency" className="text-sm text-gray-700">
              This is an emergency contact group
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Initial Contacts
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg divide-y divide-gray-200">
              {contacts.map(contact => (
                <div key={contact.id} className="flex items-center p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id={`contact-${contact.id}`}
                    checked={newGroup.contacts.includes(contact.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewGroup({
                          ...newGroup,
                          contacts: [...newGroup.contacts, contact.id]
                        });
                      } else {
                        setNewGroup({
                          ...newGroup,
                          contacts: newGroup.contacts.filter(id => id !== contact.id)
                        });
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`contact-${contact.id}`} className="flex flex-1 items-center cursor-pointer">
                    <span className="font-medium text-gray-900 mr-2">{contact.name}</span>
                    <span className="text-xs text-gray-500">({contact.phone})</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowAddGroup(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveGroup}
            disabled={!newGroup.name}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
              !newGroup.name
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            } transition-colors`}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {(showAddContact && <AddContactModal />) || (showAddGroup && <AddGroupModal />)}
      
      <div className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Emergency Contact System</h1>
            <p className="text-gray-600 mt-1">
              Manage your emergency contacts, create groups, and set up instant alerts
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setView('emergency')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Alert
            </button>
            <button 
              onClick={() => alert('In a real implementation, this would generate a printable PDF with your emergency contacts.')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Contacts
            </button>
          </div>
        </div>
        
        <div className="flex mt-4 border-b border-gray-200">
          <button
            onClick={() => setView('contacts')}
            className={`pb-2 px-4 text-sm font-medium ${
              view === 'contacts' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setView('groups')}
            className={`pb-2 px-4 text-sm font-medium ${
              view === 'groups' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Groups
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {view === 'emergency' ? (
          <EmergencyAlertPage />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {view === 'contacts' ? (
              <>
                <ContactList />
                <ContactDetails />
              </>
            ) : (
              <>
                <GroupsList />
                <GroupDetails />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;