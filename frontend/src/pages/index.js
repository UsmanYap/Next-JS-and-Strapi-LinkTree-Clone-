import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { getAllAccounts } from "@/api/services";
import Image from "next/image";

import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await getAllAccounts();
        const dataAccounts = response.data.data;
        console.log("Data Accounts:", dataAccounts);
        setAccounts(dataAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }

    fetchAccounts();
  }, []);

  return (
    <main className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}>
      {accounts.map((account) => (
        <Link key={account.id} href={`/${account.attributes.slug}`}>
          <div className="flex flex-col items-center gap-2 w-full mb-12">
            {account.attributes.photo && account.attributes.photo.data.attributes.url ? (
              <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.attributes.photo.data.attributes.url.slice(1)}`} alt={`Foto Profil ${account.attributes.fullname}`} width={150} height={150} />
            ) : (
              <p>Foto tidak tersedia</p>
            )}
            <h3 className="text-2xl font-bold">{account.attributes.fullname}</h3>
            <p className="text-lg">{account.attributes.bio}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
