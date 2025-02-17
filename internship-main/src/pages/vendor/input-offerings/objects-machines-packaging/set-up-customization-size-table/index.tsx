import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { Table } from '@/components/common/table';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { categoryInputOfferings } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonButton,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLink = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLink,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const kindsToUse = [
  {
    value: 'kind1',
    label: 'Kind 1',
    maxHeight: 100,
    maxWidth: 100,
    maxArea: 100,
    name: 'Kind Name',
    id: 'kindid1',
  },
  {
    value: 'kind2',
    label: 'Kind 2',
    maxHeight: 100,
    maxWidth: 100,
    maxArea: 100,
    name: 'Kind Name',
    id: 'kindid2',
  },
  {
    value: 'kind3',
    label: 'Kind 3',
    maxHeight: 100,
    maxWidth: 100,
    maxArea: 100,
    name: 'Kind Name',
    id: 'kindid3',
  },
];

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryInputOfferings,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const SetUpCustomizationSizeTable: FC = () => {
  const [kinds, setKinds] = useState(kindsToUse);
  const addKind = () => {
    const newKind = {
      value: 'kind' + (kinds.length + 1),
      label: 'Kind ' + (kinds.length + 1),
      maxHeight: 100,
      maxWidth: 100,
      maxArea: 100,
      name: 'Kind Name',
      id: 'kindid' + (kinds.length + 1),
    };
    setKinds([...kinds, newKind]);
  };

  const removeKind = (id: string) => {
    const newKinds = kinds.filter(kind => kind.id !== id);
    setKinds(newKinds);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newKinds = kinds.map(kind => {
      if (kind.id === id) {
        return { ...kind, [event.target.name]: event.target.value };
      }
      return kind;
    });
    setKinds(newKinds);
  };

  const columns = [
    { header: '', key: '', width: 'w-1/5' },
    { header: 'Name', key: 'name', width: 'w-1/5' },
    { header: 'Max Width', key: 'maxWidth', width: 'w-1/5' },
    { header: 'Max Height', key: 'maxHeight', width: 'w-1/5' },
    { header: 'Max A', key: 'maxArea', width: 'w-1/5' },
  ];

  return (
    <section className="mt-4 p-2">
      <ShowWindowTitle
        smallTitle
        secondTitle="Set Up Customization Size Table"
      />

      <Select
        labelToUse="Choose which Technology the size table applies to"
        options={[
          'Customization Technology 1',
          'Customization Technology 2',
          'Customization Technology 3',
          'Customization Technology 4',
          'Customization Technology 5',
        ]}
      />

      <Select
        labelToUse="Choose measuring units"
        options={['m', 'cm', 'mm', 'in']}
      />
      <section className="-mt-5 inline-flex">
        <button className="m-5 flex w-36 items-center justify-around rounded-xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>

      <section className="m-2 overflow-y-hidden overflow-x-visible p-2">
        <h3 className="text-xl font-bold">Customization Size Chart</h3>

        <Table
          data={kinds}
          columns={columns}
          onRemove={removeKind}
          onAdd={addKind}
          onChange={onChange}
          addButtonText="Add Another Kind"
        />
      </section>
      <section className="-mt-5 inline-flex">
        <button className="m-5 flex w-36 items-center justify-around rounded-xl border-4 p-2">
          Edit
        </button>
        <CommonButton type="button" className="w-36 rounded-2xl">
          Save
        </CommonButton>
      </section>
      <Select
        labelToUse="A sizes in cm (1 in = 2.54 cm)"
        options={[
          'A1 - 59.4 x 84.1 cm',
          'A2 - 42 x 59.4 cm',
          'A3 - 29.7 x 42 cm',
          'A4 - 21 x 29.7 cm',
          'A5 - 14.8 x 21 cm',
          'A6 - 10.5 x 14.8 cm',
          'A7 - 7.4 x 10.5 cm',
          'A8 - 5.2 x 7.4 cm',
          'A9 - 3.7 x 5.2 cm',
          'A10 - 2.6 x 3.7 cm',
        ]}
      />

      <CommonLink href={routes.vendor.inputOfferings.objMachPack.default}>
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default SetUpCustomizationSizeTable;
export { getServerSideProps };
