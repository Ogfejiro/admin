"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, Settings, Lock, ArrowLeftCircle, ArrowRightCircle, X } from 'lucide-react';

const initialUsers = [
  {
    id: 1,
    name: 'Chidi Onah',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Software engineer with a passion for building beautiful and functional web applications. Enjoys hiking and photography.',
    profilePicture: 'https://placehold.co/150x150/9CA3AF/ffffff?text=JD',
  },
  {
    id: 2,
    name: 'Steve Amin',
    email: 'john.smith@example.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    bio: 'Product manager with a focus on user-centric design. Loves rock climbing and cooking.',
    profilePicture: 'https://placehold.co/150x150/6B7280/ffffff?text=JS',
  },
  {
    id: 3,
    name: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    bio: 'UX designer specializing in mobile interfaces. A proud dog owner and coffee connoisseur.',
    profilePicture: 'https://placehold.co/150x150/4B5563/ffffff?text=SL',
  },
];

const ProfilePage = () => {
  // State to manage the list of users
  const [users, setUsers] = useState(initialUsers);
  // State to keep track of the currently active user by their ID
  const [activeUserId, setActiveUserId] = useState(initialUsers[0].id);
  const [modalType, setModalType] = useState(null); // 'editProfile', 'changePassword', or null

  // Find the active user from the users state
  const activeUser = users.find(user => user.id === activeUserId);
  const activeUserIndex = users.findIndex(user => user.id === activeUserId);

  // Function to navigate to the next profile in the array
  const handleNextProfile = () => {
    const nextIndex = (activeUserIndex + 1) % users.length;
    setActiveUserId(users[nextIndex].id);
  };

  // Function to navigate to the previous profile in the array
  const handlePrevProfile = () => {
    const prevIndex = (activeUserIndex - 1 + users.length) % users.length;
    setActiveUserId(users[prevIndex].id);
  };
  
  // Function to update user details
  const updateUser = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
  };
  
  // Reusable component for displaying a single profile info item
  const ProfileInfoItem = ({ label, value, icon: Icon, onClick }) => (
    <div
      className="flex items-start mb-4 p-2 rounded-xl transition-colors duration-200 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex-shrink-0 text-gray-400 mt-1">
        <Icon size={20} />
      </div>
      <div className="ml-4">
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-gray-900 font-semibold">{value}</p>
      </div>
    </div>
  );

  // Modal for editing profile details
  const EditProfileModal = ({ onClose, user, onSave }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);

    const handleSave = (e) => {
      e.preventDefault();
      onSave({ ...user, name, bio });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Modal for changing password
  const ChangePasswordModal = ({ onClose }) => {
    const handleSavePassword = (e) => {
      e.preventDefault();
      // Placeholder for password change logic
      alert('Password change functionality not yet implemented!');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Change Password</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSavePassword}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-blue-700"
              >
                Save Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      {/* Profile Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">User Profile</h1>
        <p className="mt-2 text-lg text-gray-500">Manage your personal information and settings</p>
      </header>

      {/* Profile Card with Navigation */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              className="h-36 w-36 rounded-full object-cover border-4 border-gray-200 transition-transform duration-300 hover:scale-105"
              src={activeUser.profilePicture}
              alt={`${activeUser.name}'s profile`}
            />
          </div>
          {/* User Details */}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">{activeUser.name}</h2>
            <p className="mt-2 text-gray-500 text-lg">{activeUser.bio}</p>
          </div>
        </div>

        {/* Profile Navigator */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevProfile}
            className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Previous Profile"
          >
            <ArrowLeftCircle size={24} />
          </button>
          <span className="text-xl font-medium text-gray-700">
            {activeUserIndex + 1} / {users.length}
          </span>
          <button
            onClick={handleNextProfile}
            className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Next Profile"
          >
            <ArrowRightCircle size={24} />
          </button>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information section */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-gray-200 text-gray-600">
              <Mail size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 ml-3">Contact Information</h3>
          </div>
          <div>
            <ProfileInfoItem label="Email" value={activeUser.email} icon={Mail} />
            <ProfileInfoItem label="Phone" value={activeUser.phone} icon={Phone} />
            <ProfileInfoItem label="Location" value={activeUser.location} icon={MapPin} />
          </div>
        </div>

        {/* Account Settings section */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-gray-200 text-gray-600">
              <Settings size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 ml-3">Account Settings</h3>
          </div>
          <div>
            <ProfileInfoItem
              label="Edit Profile"
              value="Update your personal details"
              icon={User}
              onClick={() => setModalType('editProfile')}
            />
            <ProfileInfoItem
              label="Change Password"
              value="Manage your account security"
              icon={Lock}
              onClick={() => setModalType('changePassword')}
            />
          </div>
        </div>
      </div>

      {/* Conditionally render the modals */}
      {modalType === 'editProfile' && <EditProfileModal onClose={() => setModalType(null)} user={activeUser} onSave={updateUser} />}
      {modalType === 'changePassword' && <ChangePasswordModal onClose={() => setModalType(null)} />}
    </div>
  );
};

export default ProfilePage;
