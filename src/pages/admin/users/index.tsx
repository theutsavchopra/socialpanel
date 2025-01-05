import { useState } from 'react';
import { useUsersStore } from '@/stores/usersStore';
import UsersTable from './UsersTable';
import UserStats from './UserStats';
import UserFilters from './UserFilters';

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'spent'>('recent');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">View and manage user accounts</p>
      </div>

      <UserStats />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <UserFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <UsersTable searchQuery={searchQuery} sortBy={sortBy} />
      </div>
    </div>
  );
}
