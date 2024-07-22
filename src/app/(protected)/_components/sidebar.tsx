export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <ul className="flex flex-col gap-2 w-full">
          <li className="flex flex-row gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <p className="text-sm font-semibold">Dashboard</p>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <p className="text-sm font-semibold">Projects</p>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <p className="text-sm font-semibold">Teams</p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-xl font-semibold">Settings</h1>
        <ul className="flex flex-col gap-2 w-full">
          <li className="flex flex-row gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <p className="text-sm font-semibold">Profile</p>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <p className="text-sm font-semibold">Account</p>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <p className="text-sm font-semibold">Billing</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
