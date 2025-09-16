"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, Settings, Lock, ArrowLeftCircle, ArrowRightCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();
  const [users, setUsers] = useState(initialUsers);
  const [activeUserId, setActiveUserId] = useState(initialUsers[0].id);
  const [modalType, setModalType] = useState(null);

  const activeUser = users.find(user => user.id === activeUserId);
  const activeUserIndex = users.findIndex(user => user.id === activeUserId);

  const handleNextProfile = () => {
    const nextIndex = (activeUserIndex + 1) % users.length;
    setActiveUserId(users[nextIndex].id);
  };

  const handlePrevProfile = () => {
    const prevIndex = (activeUserIndex - 1 + users.length) % users.length;
    setActiveUserId(users[prevIndex].id);
  };

  const updateUser = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const ProfileInfoItem = ({ label, value, icon: Icon, onClick }) => (
    <div
      className="flex items-start mb-4 p-2 rounded-xl transition-colors duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      <div className="flex-shrink-0 text-gray-400 dark:text-gray-500 mt-1">
        <Icon size={20} />
      </div>
      <div className="ml-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-gray-900 dark:text-gray-100 font-semibold">{value}</p>
      </div>
    </div>
  );

  const EditProfileModal = ({ onClose, user, onSave }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);

    const handleSave = (e) => {
      e.preventDefault();
      onSave({ ...user, name, bio });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-gray-950/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 rounded-3xl shadow-xl w-full max-w-lg p-8 transform transition-transform duration-300 scale-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Edit Profile</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded-xl w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded-xl w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 dark:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ChangePasswordModal = ({ onClose }) => {
    const handleSavePassword = (e) => {
      e.preventDefault();
      alert('Password change functionality not yet implemented!');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-gray-950/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 rounded-3xl shadow-xl w-full max-w-lg p-8 transform transition-transform duration-300 scale-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Change Password</h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSavePassword}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="new-password">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded-xl w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="shadow appearance-none border border-gray-300 dark:border-gray-700 rounded-xl w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 dark:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-200 hover:bg-blue-700 dark:hover:bg-blue-600"
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-8 font-sans antialiased text-gray-900 dark:text-gray-50">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50">User Profile</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Manage your personal information and settings</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              className="h-32 w-32 md:h-36 md:w-36 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 shadow-md"
              src={activeUser.profilePicture}
              alt={`${activeUser.name}'s profile`}
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{activeUser.name}</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">{activeUser.bio}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevProfile}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Previous Profile"
          >
            <ArrowLeftCircle size={24} />
          </button>
          <span className="text-xl font-medium text-gray-700 dark:text-gray-300">
            {activeUserIndex + 1} / {users.length}
          </span>
          <button
            onClick={handleNextProfile}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Next Profile"
          >
            <ArrowRightCircle size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Mail size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 ml-3">Contact Information</h3>
          </div>
          <div>
            <ProfileInfoItem label="Email" value={activeUser.email} icon={Mail} />
            <ProfileInfoItem label="Phone" value={activeUser.phone} icon={Phone} />
            <ProfileInfoItem label="Location" value={activeUser.location} icon={MapPin} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Settings size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 ml-3">Account Settings</h3>
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

      {modalType === 'editProfile' && <EditProfileModal onClose={() => setModalType(null)} user={activeUser} onSave={updateUser} />}
      {modalType === 'changePassword' && <ChangePasswordModal onClose={() => setModalType(null)} />}
    </div>
  );
};

export default ProfilePage;