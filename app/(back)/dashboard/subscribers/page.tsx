import React from "react";
import { Subscriber } from "@prisma/client";
import { columns } from "./columns";
import { fetchSubscribers } from "@/actions/subscriberActions";
import TableHeader from "@/components/DataTableComponents/TableHeader copy";
import DataTable from "@/components/DataTableComponents/DataTable";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "/subscribers",
  description:
    "Stay informed with the latest news, stories, and insights from Rubirizi and beyond. Rubirizi Bulletin offers in-depth coverage, timely updates, and a fresh perspective on the topics that matter most.",
  alternates: {
    canonical: "/subscribers",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export default async function page() {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }
  const subscribers: Subscriber[] = (await fetchSubscribers()) || [];
  return (
    <div>
      <div className="lg:p-8 md:p-8 ">
        <TableHeader
          title="Subscribers"
          data={subscribers}
          model="subscriber"
        />
        <div className="py-8">
          <DataTable data={subscribers} columns={columns} />
        </div>
      </div>
    </div>
  );
}
