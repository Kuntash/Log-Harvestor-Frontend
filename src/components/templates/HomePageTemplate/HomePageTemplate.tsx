import React from "react";
import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { QueryInterface } from "@main/components/organisms/QueryInterface";
import { IngestInterface } from "@main/components/organisms/IngestInterface";

export const HomePageTemplate = () => {
  return (
    <>
      <Head>
        <title>Log Harvestor app</title>
        <meta name="description" content="Query and harvest your logs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center gap-y-4">
        {/* Header */}

        <header className="p-3">
          <h1 className="text-3xl font-bold tracking-tighter">
            Log Harvestor App
          </h1>
        </header>
        {/* Tabs for query and ingest interface */}
        <section className="text-center">
          <Tabs defaultValue="query-interface" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="query-interface">Query interface</TabsTrigger>
              <TabsTrigger value="ingest-interface">
                Ingest interface
              </TabsTrigger>
            </TabsList>
            <TabsContent value="query-interface">
              {/* Query Interface -> to run queries through all the ingested logs for the current user */}
              <QueryInterface />
            </TabsContent>
            <TabsContent value="ingest-interface">
              {/* Ingest Interface -> to send post request and save logs to be ingested in future */}
              <IngestInterface />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </>
  );
};
