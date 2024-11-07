import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex items-center">
                <h1 className="text-2xl font-bold mr-4">My Blog</h1>
                <nav>
                    <Link href="/" className="text-white px-4 py-2 hover:underline">Home</Link>
                    <Link href="/admin" className="text-white px-4 py-2 hover:underline">Admin</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;