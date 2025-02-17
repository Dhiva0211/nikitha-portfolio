import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { RenderIf } from '@/helpers/common/render-conditional';
import { ApiResponse } from '@/helpers/interfaces';
import { apiRoutes } from '@/routes';
import { Categories } from '@prisma/client';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { buildTheListCategoriesSideBar } from '@/helpers/categories';

const recursiveContentBuilder = (content: unknown) => {
  if (typeof content === 'object' && content !== null) {
    return Object.entries(content).map(([key, value]) =>
      key === value ? (
        <p key={key} className="ml-4 cursor-pointer font-extrabold">
          {key}
        </p>
      ) : (
        <details key={key} open={false} className="my-2 ml-2">
          <summary className="ml-2 cursor-pointer font-extrabold">
            {key}
          </summary>
          {recursiveContentBuilder(value)}
        </details>
      ),
    );
  }

  return null;
};

interface SideBarCategoriesProps {
  readonly openRightSideBar: boolean;
  setOpenRightSideBar: Dispatch<SetStateAction<boolean>>;
}

const SideBarCategories: FC<SideBarCategoriesProps> = ({
  openRightSideBar,
  setOpenRightSideBar,
}) => {
  const [categories, setCategories] = useState<
    Record<string, Categories> | undefined
  >(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCategories = async () => {
      await fetch(apiRoutes.categories, {
        cache: 'force-cache',
        next: {
          revalidate: 86400,
        },
      })
        .then(resp => resp.json())
        .then(async (resp: ApiResponse) => {
          if ('error' in resp) {
            setError(resp?.error);
            return;
          }

          if ('data' in resp)
            setCategories(
              await buildTheListCategoriesSideBar(
                //@ts-expect-error - the response is an array of categories
                resp?.data as ReadonlyArray<Categories>,
              ),
            );
        })
        .finally(() => setLoading(false));
    };

    if (categories === undefined && openRightSideBar) getCategories();
  }, [categories, openRightSideBar]);

  return (
    <aside
      className={`fixed inset-y-0 -right-1 z-50 overflow-y-scroll rounded-l-2xl border-y-4 border-l-4 border-deep-sapphire bg-white transition-all duration-300 ${openRightSideBar ? 'w-1/2' : 'w-0'}`}
    >
      <section className="m-2 overflow-hidden">
        <button
          type="button"
          className="absolute right-0 top-0 size-10 scale-100 transition-transform hover:scale-150"
          onClick={() => setOpenRightSideBar(value => !value)}
        >
          <span className="m-2 text-4xl">x</span>
          <span className="hidden">Close Button</span>
        </button>

        <RenderIf
          condition={loading}
          then={
            <section className="mt-10">
              <DotsAnimation />
            </section>
          }
          otherwise={
            <RenderIf
              condition={error !== null}
              then={<p className="mt-10 text-center text-red-500">{error}</p>}
              otherwise={Object.entries({ ...categories }).map(
                ([category, content]) => (
                  <details key={category} open={false} className="mb-2">
                    <summary className="text-xl font-extrabold">
                      {category}
                    </summary>

                    {recursiveContentBuilder(content)}
                  </details>
                ),
              )}
            />
          }
        />
      </section>
    </aside>
  );
};

export default SideBarCategories;
