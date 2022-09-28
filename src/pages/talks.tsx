import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { ConferenceTalks } from '@/components/talks/ConferenceTalks';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { useTalksQuery } from '@/utils/__generated__/graphql';
import { useAuthenticationStatus } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';

const TalksPage = () => {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <div className="flex flex-col max-w-5xl px-4 mx-auto my-10">
      <ConferenceTalks />

      {isAuthenticated && (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Talk
          </h1>
          <AddNewTalk />
        </div>
      )}
    </div>
  );
};

TalksPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useTalksQuery.getKey(),
    useTalksQuery.fetcher(),
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 1,
  };
}

export default TalksPage;
