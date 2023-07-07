import { useState } from 'react';
import Link from 'next/link';
import { BiUser, BiBook, BiPackage } from 'react-icons/bi';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        My Dashboard
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link href="/ap/account" legacyBehavior>
            <a
              className={`sidebar-item ${activeItem === 'account' ? 'active' : ''}`}
              onClick={() => handleItemClick('account')}
            >
              <BiUser className="sidebar-icon" />
              <span className="menu-item">Account Preferences</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/ap/address" legacyBehavior>
            <a
              className={`sidebar-item ${activeItem === 'address' ? 'active' : ''}`}
              onClick={() => handleItemClick('address')}
            >
              <BiBook className="sidebar-icon" />
              <span className="menu-item">Address Book</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/ap/orders" legacyBehavior>
            <a
              className={`sidebar-item ${activeItem === 'orders' ? 'active' : ''}`}
              onClick={() => handleItemClick('orders')}
            >
              <BiPackage className="sidebar-icon" />
              <span className="menu-item">Orders</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
