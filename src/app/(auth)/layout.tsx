import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Image
        src={"/images/background.jpg"}
        fill
        alt=""
        className=" object-cover"
      />
      {children}
    </div>
  );
}
