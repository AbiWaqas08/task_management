import { useAuth } from "../../context/AuthContext";
import {
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { user } = useAuth();

  const Item = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 border-b border-border pb-3">
      <Icon className="w-6 h-6 text-primary" />
      <div>
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="text-lg font-medium text-text-primary">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Profile
      </h1>

      <div className="bg-surface p-6 rounded-lg shadow border border-border space-y-4">
        <div className="flex justify-center mb-4">
  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
    {user?.name?.charAt(0) || "A"}
  </div>
</div>
        <Item
          icon={UserIcon}
          label="Name"
          value={user?.name}
        />

        <Item
          icon={EnvelopeIcon}
          label="Email"
          value={user?.email}
        />

        <Item
          icon={ShieldCheckIcon}
          label="Role"
          value={user?.role}
        />

      </div>
    </div>
  );
};

export default Profile;