import Box from "@/shared/ui/Box";
import Title from "@/shared/ui/Title";
import React from "react";
import { useProfile } from "../service/useProfile";

const Profile = () => {
  const { getProfile } = useProfile();
  const { data, isLoading } = getProfile();

  if (isLoading) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center text-red-500 mt-10">No data found</div>;
  }

  return (
    <Box>
      <Title>My Profile</Title>

      <div className="flex justify-center mt-8">
        <div className="bg-white shadow rounded-lg w-full max-w-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">
              {data.fname} {data.lname}
            </h2>
          </div>

          <div className="space-y-2 text-sm">
            <ProfileRow label="First Name" value={data.fname} />
            <ProfileRow label="Last Name" value={data.lname} />
            <ProfileRow label="Role" value={data.role} />
            {data.email && <ProfileRow label="Email" value={data.email} />}
            {data.phone && <ProfileRow label="Phone" value={data.phone} />}
            {data.createdAt && (
              <ProfileRow
                label="Created At"
                value={new Date(data.createdAt).toLocaleString()}
              />
            )}
            {data.updatedAt && (
              <ProfileRow
                label="Updated At"
                value={new Date(data.updatedAt).toLocaleString()}
              />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

const ProfileRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-gray-200 py-1">
    <span className="text-gray-500">{label}</span>
    <span className="text-black">{value}</span>
  </div>
);

export default React.memo(Profile);
