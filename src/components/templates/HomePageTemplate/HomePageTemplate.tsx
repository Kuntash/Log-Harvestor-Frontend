import React from "react";
import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { QueryInterface } from "@main/components/organisms/QueryInterface";
import { IngestInterface } from "@main/components/organisms/IngestInterface";
import { Copy } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@main/components/ui/use-toast";

export const HomePageTemplate = () => {
  const auth = useUser();
  const { toast } = useToast();
  return (
    <>
      <Head>
        <title>Log Harvestor app</title>
        <meta name="description" content="Query and harvest your logs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center gap-y-4">
        {/* Header */}

        <header className="flex flex-wrap items-center gap-3 p-3">
          <h1 className="text-3xl font-bold tracking-tighter">
            Log Harvestor App
          </h1>
          <button
            className="flex items-center gap-x-2 text-sm text-muted-foreground"
            onClick={async () => {
              if (!auth?.user?.id) return;
              await navigator.clipboard.writeText(auth?.user?.id);
              toast({
                description: "Your user id is copied",
              });
            }}
          >
            Copy your user ID
            <Copy size={14} />
          </button>
        </header>
        {/* Tabs for query and ingest interface */}
        <section className="text-center">
          <Tabs className="RootTabs" defaultValue="query-interface">
            <TabsList>
              <TabsTrigger value="query-interface">Query interface</TabsTrigger>
              <TabsTrigger value="ingest-interface">
                Ingest interface
              </TabsTrigger>
            </TabsList>
            <TabsContent value="query-interface" className="px-2">
              {/* Query Interface -> to run queries through all the ingested logs for the current user */}
              <QueryInterface />
            </TabsContent>
            <TabsContent value="ingest-interface">
              {/* Ingest Interface -> to send post request and save logs to be ingested in future */}
              <IngestInterface />
            </TabsContent>
          </Tabs>
        </section>
        <footer className="justify-self-end p-2 text-muted-foreground">
          Built with ❤️ by Kunga [kuntashtashi11@gmail.com]
        </footer>
      </main>
    </>
  );
};
