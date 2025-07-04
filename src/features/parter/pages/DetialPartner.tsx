import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePartner } from "../service/usePartner";
import { Pencil, Trash2 } from "lucide-react";
import Title from "@/shared/ui/Title";
import Box from "@/shared/ui/Box";

const DetailPartner = () => {
  const { id, partner } = useParams<{ id: string, partner: string }>();  
  const navigate = useNavigate()

  const { getPartner } = usePartner();

  const { data, isLoading } = getPartner(id!);

  if (isLoading) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center text-red-500 mt-10">No data found</div>;
  }

  return (
    <Box>
      <Title>Partner Detail</Title>
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow rounded-lg w-full max-w-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">{data.fullname}</h2>
            <div className="flex gap-2">
              <button
                className="hover:bg-gray-100 p-1 rounded"
              >
                <Pencil size={18} className="text-gray-600" />
              </button>
              <button
                className="hover:bg-gray-100 p-1 rounded"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <DetailRow label="Address" value={data.adress} />
            <DetailRow label="Balance" value={data.balance.toString()} />
            <DetailRow label="Phone" value={data.phone.join(", ")} />
            <DetailRow label="Role" value={data.role} />
            <DetailRow label="Active" value={data.isActive ? "Yes" : "No"} />
            <DetailRow label="Archived" value={data.isArchive ? "Yes" : "No"} />
            <DetailRow
              label="Created By"
              value={
                data.createdBy
                  ? `${data.createdBy.fname} ${data.createdBy.lname}`
                  : "N/A"
              }
            />
            <DetailRow
              label="Created At"
              value={new Date(data.createdAt).toLocaleString()}
            />
            <DetailRow
              label="Updated At"
              value={new Date(data.updatedAt).toLocaleString()}
            />
          </div>
        </div>
      </div>
      <button className="bg-gray-70 shadow w-[80px] hover:bg-gray-100" onClick={()=> navigate(partner==='customer'?`/`:`/${partner}`)}>Go back</button>
    </Box>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-gray-200 py-1">
    <span className="text-gray-500">{label}</span>
    <span className="text-black">{value}</span>
  </div>
);


export default React.memo(DetailPartner);

