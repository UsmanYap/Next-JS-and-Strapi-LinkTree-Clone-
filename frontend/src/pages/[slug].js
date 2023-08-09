import { getAllAccounts, getSelectedAccount } from "@/api/services";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function SlugPage({ data }) {
  return (
    <main className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}>
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
        <Image className="relative" layout="fill" objectFit="cover" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.attributes.photo.data.attributes.url.slice(1)}`} alt={data.attributes.fullname} />
      </div>

      <div className="flex flex-col items-center gap-2 w-full mb-12">
        <h3 className="text-xl font-bold">{data.attributes.fullname}</h3>
        <p className="text-lg">{data.attributes.bio}</p>
      </div>

      <div className="flex flex-col items-center gap-8 w-full">
        {data.attributes.links.data.map((item, index) => (
          <>
            {item.attributes.status === "active" ? (
              <a
                key={index}
                className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
                href={item.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.attributes.title}
              </a>
            ) : item.attributes.status === "suspend" ? (
              <a key={index} className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer" target="_blank" rel="noopener noreferrer">
                {item.attributes.title}
              </a>
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </main>
  );
}

// function untuk generate list .html berdasarkan dynamic routes dari list slug dari backend
export async function getStaticPaths() {
  const accounts = await getAllAccounts();
  const dataAccounts = await accounts.data.data;

  const paths = dataAccounts.map((account) => {
    return {
      params: { slug: account.attributes.slug },
    };
  });

  return { paths, fallback: "blocking" };
}

// export async function getStaticProps({ params }) {
//   const selectedAccount = await getSelectedAccount(params.slug);

//   return {
//     props: {
//       data: selectedAccount.data.data[0],
//     },
//     revalidate: 10, // untuk validasi data ke backend tiap x second
//   };
// }
export async function getStaticProps({ params }) {
  const selectedAccount = await getSelectedAccount(params.slug);

  if (!selectedAccount.data.data[0]) {
    return {
      notFound: true, // Return notFound: true to trigger a 404 page
    };
  }

  return {
    props: {
      data: selectedAccount.data.data[0],
    },
    revalidate: 10,
  };
}

// // Inside the component rendering
// const AccountPage = ({ data }) => {
//   const router = useRouter();

//   // Check if the page is still loading
//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   // Check if the account data exists
//   if (!data) {
//     return <Error statusCode={404} />;
//   }

//   // Render the account details using the 'data' prop
//   return <div>{/* Render the account details */}</div>;
// };

// Inside the component rendering
const AccountPage = ({ data }) => {
  const router = useRouter();

  // Check if the page is still loading
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Check if the account data exists
  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <main className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}>
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
        <Image className="relative" layout="fill" objectFit="cover" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.attributes.photo.data.attributes.url.slice(1)}`} alt={data.attributes.fullname} />
      </div>

      <div className="flex flex-col items-center gap-2 w-full mb-12">
        <h3 className="text-xl font-bold">{data.attributes.fullname}</h3>
        <p className="text-lg">{data.attributes.bio}</p>
      </div>
      <div className="flex flex-col items-center gap-8 w-full">
        {data.attributes.links.data.map((item, index) => (
          <a
            key={index}
            className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
            href={item.attributes.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.attributes.title}
          </a>
        ))}
      </div>
    </main>
  );
};
