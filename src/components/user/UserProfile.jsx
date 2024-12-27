import React, { useState } from 'react';
import useAuthStore from '../../store/useAuthStore.js';
import useUserStore from '../../store/useUserStore.js';
import FullPageLoader from '../skeletons/FullPageLoader.jsx';

export default function UserProfile() {
  const { user, isCheckingAuth } = useAuthStore();
  const { updateProfile } = useUserStore();

  const handleEditProfile = () => {
    const updatedProfile = {
      firstName: prompt('Enter First Name', user.firstName) || user.firstName,
      lastName: prompt('Enter Last Name', user.lastName) || user.lastName,
      phone: prompt('Enter Phone Number', user.phone) || user.phone,
      profilePicture: prompt('Enter Profile Picture URL', user.profilePicture) || user.profilePicture,
    };

    // Call the updateProfile function
    updateProfile(updatedProfile)
      .then(() => alert('Profile updated successfully!'))
      .catch((error) => alert(`Failed to update profile: ${error.message}`));
  };

  if (isCheckingAuth) {
    return <FullPageLoader />;
  }

  return (
    <div className="container mx-auto my-4 px-10">
      <div className="card w-full bg-base-100 shadow-xl">
        <figure>
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto mt-5"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center">
            {user.firstName} {user.lastName}
          </h2>
          <p className="">{user.role.toUpperCase()}</p>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Email:</strong>
                <p>{user.email}</p>
              </div>
              <div>
                <strong>Phone:</strong>
                <p>{user.phone || 'Not Provided'}</p>
              </div>
              <div>
                <strong>Verified:</strong>
                <p>{user.isVerified ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <p>{user.isActive ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button onClick={handleEditProfile} className="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
