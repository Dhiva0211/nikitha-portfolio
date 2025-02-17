import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import { routes } from '@/routes';
import { getToken, validSessionToken } from '@/helpers/validations';
import { GetServerSideProps } from 'next';
import { RenderIf } from '@/helpers/common/render-conditional';
import { categoryOrderSetUp } from '@/helpers/initial-values';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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
const Description = dynamic(
  () =>
    import('@/components/common/description').then(mod => ({
      default: mod.Description,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const StateButton = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.StateButton,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonLinkNoBg = dynamic(
  () =>
    import('@/components/common/link-button').then(mod => ({
      default: mod.CommonLinkNoBg,
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
const DialogHandler = dynamic(
  () =>
    import('@/components/common/dialog').then(mod => ({
      default: mod.DialogHandler,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const CommonModal = dynamic(
  () =>
    import('@/components/common/modal').then(mod => ({
      default: mod.CommonModal,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const InputLabelLeft = dynamic(
  () =>
    import('@/components/common/input').then(mod => ({
      default: mod.InputLabelLeft,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);

const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers.cookie);

  const user = await validSessionToken(
    token,
    context.resolvedUrl,
    true,
    true,
    false,
    categoryOrderSetUp,
  );
  if (user && ('redirect' in user || !user.BusinessInfo)) return user as never;

  return {
    props: {},
  };
};

const tableMocks = [
  { id: 1, name: 'Solutions 1', type: '' },
  { id: 2, name: 'Solutions 2', type: '' },
  { id: 3, name: 'Solutions 3', type: '' },
  { id: 4, name: 'Solutions 4', type: '' },
  { id: 5, name: 'Solutions 5', type: '' },
  { id: 6, name: 'Solutions 6', type: '' },
  { id: 7, name: 'Solutions 7', type: '' },
  { id: 8, name: 'Solutions 8', type: '' },
  { id: 9, name: 'Solutions 9', type: '' },
  { id: 10, name: 'Solution 10', type: '' },
];

const calenderOptions = Object.freeze({
  Calendly: {
    name: 'Calendly',
    link: 'https://calendly.com/',
  },
  MicrosoftBookings: {
    name: 'Microsoft Bookings',
    link: 'https://outlook.office365.com/owa/calendar/',
  },
  Youcanbookme: {
    name: 'Youcanbookme',
    link: 'https://youcanbook.me/',
  },
  SimplyBook: {
    name: 'SimplyBook.me',
    link: 'https://simplybook.me/',
  },
  SquareAppointments: {
    name: 'Square Appointments',
    link: 'https://square.appointments.com/',
  },
  Doodle: {
    name: 'Doodle',
    link: 'https://doodle.com/',
  },
  SetMore: {
    name: 'SetMore',
    link: 'https://www.setmore.com/',
  },
  AcuityScheduling: {
    name: 'Acuity Scheduling',
    link: 'https://acuityscheduling.com/',
  },
  Appointlet: {
    name: 'Appointlet',
    link: 'https://www.appointlet.com/',
  },
  Cal: {
    name: 'Cal.com',
    link: 'https://cal.com/',
  },
});
const videoOptions = Object.freeze({
  Zoom: {
    name: 'Zoom',
    link: 'https://zoom.us/',
  },
  Skype: {
    name: 'Skype',
    link: 'https://www.skype.com/',
  },
  GoogleMeet: {
    name: 'Google Meet',
    link: 'https://meet.google.com/',
  },
  MicrosoftTeams: {
    name: 'Microsoft Teams',
    link: 'https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software',
  },
});

enum ModalId {
  physicalDelivery = 'physicalDelivery',
  vendorAddress = 'vendorAddress',
  shoppittoAddress = 'shoppittoAddress',
  remoteDelivery = 'remoteDelivery',
}

const DeliveryMethod: FC = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingTable, setIsEditingTable] = useState<
    Record<string, Record<string, boolean>> | undefined
  >();
  const [isAModalOpen, setIsAModalOpen] = useState<Record<string, boolean>>({
    [ModalId.physicalDelivery]: false,
    [ModalId.vendorAddress]: false,
    [ModalId.shoppittoAddress]: false,
    [ModalId.remoteDelivery]: false,
  });
  const [calendarLinkToUseVendorAddress, setCalendarLinkToUseVendorAddress] =
    useState<string>('');
  const [calendarIdToUseVendorAddress, setCalendarIdToUseVendorAddress] =
    useState<string>('');
  const [
    calendarLinkToUseShoppittoAddress,
    setCalendarLinkToUseShoppittoAddress,
  ] = useState<string>('');
  const [calendarIdToUseShoppittoAddress, setCalendarIdToUseShoppittoAddress] =
    useState<string>('');
  const [videoLinkToUseRemoteDelivery, setVideoLinkToUseRemoteDelivery] =
    useState<string>('');
  const [videoIdToUseRemoteDelivery, setVideoIdToUseRemoteDelivery] =
    useState<string>('');

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  const enableEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditTable = (column: number, row: number) => {
    setIsEditingTable({
      ...isEditingTable,
      [`${column}`]: {
        ...isEditingTable?.[`${column}`],
        [`${row}`]: !isEditingTable?.[`${column}`]?.[`${row}`],
      },
    });
  };

  const handleCalendarLinkVendorAddress = (link: string) => {
    setCalendarLinkToUseVendorAddress(link);
  };

  const handleCalendarLinkShoppittoAddress = (link: string) => {
    setCalendarLinkToUseShoppittoAddress(link);
  };

  const handleVideoLinkRemoteDelivery = (link: string) => {
    setVideoLinkToUseRemoteDelivery(link);
  };

  const handleOpenModal = (modalId: ModalId, close?: boolean) => {
    setIsAModalOpen({
      ...isAModalOpen,
      [modalId]: close ? false : true,
    });
  };

  return (
    <section className="mt-4 max-w-full px-4">
      <ShowWindowTitle smallTitle secondTitle="Order Setup" />

      <DialogHandler isOpen={isAModalOpen.physicalDelivery}>
        <CommonModal modalId="physicalDelivery" title="Physical Delivery">
          <CommonLinkNoBg
            className="rounded-lg p-2"
            href={routes.underConstruction}
          >
            Integrate with Onsite Shipping Company Software
          </CommonLinkNoBg>
          <CommonLinkNoBg
            className="rounded-lg p-2"
            href={
              routes.vendor.orderSetup.generalSolutions.individualServices
                .shippingDestination
            }
          >
            Input Allowed Shipping Destinations Manually
          </CommonLinkNoBg>

          <CommonButton
            type="button"
            className="font-bold"
            onClick={() => handleOpenModal(ModalId.physicalDelivery, true)}
          >
            Done
          </CommonButton>
        </CommonModal>
      </DialogHandler>

      <DialogHandler isOpen={isAModalOpen.vendorAddress}>
        <CommonModal modalId="vendorAddress" title="Vendor's Address">
          <InputLabelLeft labelToUse="Vendor's Address" />

          <section className="flex justify-center">
            <section className="flex flex-col text-center text-deep-sapphire">
              <label
                htmlFor="calendarLinkVendorAddress"
                className="pt-1 text-lg font-bold"
              >
                Select which calendar link type you want to use
              </label>

              <select
                name="calendarLinkVendorAddress"
                id="calendarLinkVendorAddress"
                className="rounded-xl border-4 p-2 text-center"
                onChange={e =>
                  handleCalendarLinkVendorAddress(
                    calenderOptions[`${e.target.value}`].link,
                  )
                }
              >
                {Object.keys(calenderOptions).map(key => (
                  <option className="text-lg font-bold" key={key} value={key}>
                    {calenderOptions[`${key}`].name}
                  </option>
                ))}
              </select>
            </section>
          </section>

          <InputLabelLeft
            labelToUse="Calendar ID for this Solution"
            value={calendarIdToUseVendorAddress}
            onChange={e => setCalendarIdToUseVendorAddress(e.target.value)}
          />

          <InputLabelLeft
            labelToUse="Calendar Link for this Solution"
            value={
              calendarLinkToUseVendorAddress + calendarIdToUseVendorAddress
            }
            readOnly
          />

          <CommonButton
            type="button"
            className="font-bold"
            onClick={() => handleOpenModal(ModalId.vendorAddress, true)}
          >
            Done
          </CommonButton>
        </CommonModal>
      </DialogHandler>

      <DialogHandler isOpen={isAModalOpen.shoppittoAddress}>
        <CommonModal modalId="shoppittoAddress" title="Shoppitto's Address">
          <InputLabelLeft labelToUse="Vendor's Address" />

          <section className="flex justify-center">
            <section className="flex flex-col text-center text-deep-sapphire">
              <label
                htmlFor="calendarLinkShoppittoAddress"
                className="pt-1 text-lg font-bold"
              >
                Select which calendar link type you want to use
              </label>

              <select
                name="calendarLinkShoppittoAddress"
                id="calendarLinkShoppittoAddress"
                className="rounded-xl border-4 p-2 text-center text-lg"
                onChange={e =>
                  handleCalendarLinkShoppittoAddress(
                    calenderOptions[`${e.target.value}`].link,
                  )
                }
              >
                {Object.keys(calenderOptions).map(key => (
                  <option key={key} value={key}>
                    {calenderOptions[`${key}`].name}
                  </option>
                ))}
              </select>
            </section>
          </section>

          <InputLabelLeft
            labelToUse="Calendar ID for this Solution"
            value={calendarIdToUseShoppittoAddress}
            onChange={e => setCalendarIdToUseShoppittoAddress(e.target.value)}
          />

          <InputLabelLeft
            labelToUse="Calendar Link for this Solution"
            value={
              calendarLinkToUseShoppittoAddress +
              calendarIdToUseShoppittoAddress
            }
            readOnly
          />

          <CommonButton
            type="button"
            onClick={() => handleOpenModal(ModalId.shoppittoAddress, true)}
          >
            Done
          </CommonButton>
        </CommonModal>
      </DialogHandler>

      <DialogHandler isOpen={isAModalOpen.remoteDelivery}>
        <CommonModal modalId="remoteDelivery" title="Remote Delivery">
          <section className="flex justify-center">
            <section className="flex flex-col text-center text-deep-sapphire">
              <label
                htmlFor="videoLinkShoppittoAddress"
                className="pt-1 text-lg font-bold"
              >
                Select which Video link type you want to use
              </label>

              <select
                name="videoLinkShoppittoAddress"
                id="videoLinkShoppittoAddress"
                className="rounded-xl border-4 p-2 text-center text-lg"
                onChange={e =>
                  handleVideoLinkRemoteDelivery(
                    videoOptions[`${e.target.value}`].link,
                  )
                }
              >
                {Object.keys(videoOptions).map(key => (
                  <option key={key} value={key}>
                    {videoOptions[`${key}`].name}
                  </option>
                ))}
              </select>
            </section>
          </section>

          <InputLabelLeft
            labelToUse="Video Id for this Solution"
            value={videoIdToUseRemoteDelivery}
            onChange={e => setVideoIdToUseRemoteDelivery(e.target.value)}
          />

          <InputLabelLeft
            labelToUse="Video Link for this Solution"
            value={videoLinkToUseRemoteDelivery + videoIdToUseRemoteDelivery}
            readOnly
          />

          <CommonButton
            type="button"
            onClick={() => handleOpenModal(ModalId.remoteDelivery, true)}
          >
            Done
          </CommonButton>
        </CommonModal>
      </DialogHandler>

      <h3 className="mb-4 text-2xl font-semibold">
        Choose Solution Delivery Method
      </h3>

      <section className="start-0 flex max-w-full flex-col gap-4">
        <div className="mx-auto w-full max-w-5xl overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-max border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs uppercase">
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-xl border-4 border-b px-2 py-3"
                >
                  10 Solutions
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-l px-2 py-3"
                >
                  Digital Delivery
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-l px-2 py-3"
                >
                  Physical Delivery
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-l px-2 py-3"
                >
                  Download Delivery
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-l px-2 py-3"
                >
                  APIs
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-l px-2 py-3"
                >
                  Vendor&apos;s Address
                </th>
                <th
                  scope="col"
                  className="border-4 border-b border-l px-2 py-3"
                >
                  Shoppitto&apos;s Address
                </th>
                <th
                  scope="col"
                  className="rounded-tr-xl border-4 border-b border-l px-2 py-3"
                >
                  Remote Delivery
                </th>
              </tr>
            </thead>
            <tbody>
              {tableMocks.map((mock, index) => (
                <tr key={mock.id}>
                  <td
                    className={`whitespace-nowrap border-4 border-b ${index === tableMocks.length - 1 ? 'rounded-bl-xl border-b-4' : ''} px-2 py-4 font-medium`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{mock.name}</span>
                    </div>
                  </td>
                  <td
                    className={`border-4 border-b border-l px-2 py-4 text-center ${index === tableMocks.length - 1 ? 'border-b-4' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['1']?.[`${index}`]}
                      onChange={() => handleEditTable(1, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['1']?.[`${index}`]
                      }
                      then={
                        <a
                          href={routes.underConstruction}
                          className="rounded-full border-4 px-8 font-bold"
                        >
                          Click
                        </a>
                      }
                      otherwise={null}
                    />
                  </td>
                  <td
                    className={`border-4 border-b border-l px-2 py-4 text-center ${index === tableMocks.length - 1 ? 'border-b-4' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['2']?.[`${index}`]}
                      onChange={() => handleEditTable(2, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['2']?.[`${index}`]
                      }
                      then={
                        <button
                          className="rounded-full border-4 px-8 font-bold"
                          onClick={() =>
                            handleOpenModal(ModalId.physicalDelivery)
                          }
                        >
                          Click
                        </button>
                      }
                      otherwise={null}
                    />
                  </td>
                  <td
                    className={`border-4 border-b border-l px-2 py-4 text-center ${index === tableMocks.length - 1 ? 'border-b-4' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['3']?.[`${index}`]}
                      onChange={() => handleEditTable(3, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['3']?.[`${index}`]
                      }
                      then={
                        <a
                          href={
                            routes.vendor.orderSetup.generalSolutions
                              .individualServices.softwareSolution
                          }
                          className="rounded-full border-4 px-8 font-bold"
                        >
                          Click
                        </a>
                      }
                      otherwise={null}
                    />
                  </td>
                  <td
                    className={`${index === tableMocks.length - 1 ? 'border-b-4' : ''} border-4 border-b border-l px-2 py-4 text-center`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['4']?.[`${index}`]}
                      onChange={() => handleEditTable(4, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['4']?.[`${index}`]
                      }
                      then={
                        <a
                          href={
                            routes.vendor.logisticsAndApis.generalSolutions
                              .individualServices.setUpApiProcess.default
                          }
                          className="rounded-full border-4 px-8 font-bold"
                        >
                          Click
                        </a>
                      }
                      otherwise={null}
                    />
                  </td>
                  <td
                    className={`border-4 border-b border-l px-2 py-4 text-center ${index === tableMocks.length - 1 ? 'border-b-4' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['5']?.[`${index}`]}
                      onChange={() => handleEditTable(5, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['5']?.[`${index}`]
                      }
                      then={
                        <button
                          className="rounded-full border-4 px-8 font-bold"
                          onClick={() => handleOpenModal(ModalId.vendorAddress)}
                        >
                          Click
                        </button>
                      }
                      otherwise={null}
                    />
                  </td>
                  <td
                    className={`border-4 border-b border-l px-2 py-4 text-center ${index === tableMocks.length - 1 ? 'border-b-4' : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['6']?.[`${index}`]}
                      onChange={() => handleEditTable(6, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['6']?.[`${index}`]
                      }
                      then={
                        <button
                          className="rounded-full border-4 px-8 font-bold"
                          onClick={() =>
                            handleOpenModal(ModalId.shoppittoAddress)
                          }
                        >
                          Click
                        </button>
                      }
                      otherwise={null}
                    />
                  </td>
                  <td
                    className={`border-4 border-b border-l px-2 py-4 ${index == tableMocks.length - 1 ? 'rounded-br-xl border-b-4' : ''} text-center`}
                  >
                    <input
                      type="checkbox"
                      className="w-full rounded border p-2"
                      checked={isEditingTable?.['7']?.[`${index}`]}
                      onChange={() => handleEditTable(7, index)}
                      disabled={!isEditing}
                    />
                    <RenderIf
                      condition={
                        !isEditing && !!isEditingTable?.['7']?.[`${index}`]
                      }
                      then={
                        <button
                          className="rounded-full border-4 px-8 font-bold"
                          onClick={() =>
                            handleOpenModal(ModalId.remoteDelivery)
                          }
                        >
                          Click
                        </button>
                      }
                      otherwise={null}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-4 flex gap-4">
          <StateButton onClick={enableEdit} disabled={isEditing} />
        </section>
      </section>

      <Description as="section">
        <p className="text-start">
          By choosing Digital Delivery, you can either go to &quot;Orders Set
          Up&quot; and click on &quot;Integrate with Digital Shipping Company
          Software&quot;, or you can go there directly by clicking on the button
          below your table choice.
        </p>
        <br />
        <p className="text-start">
          By choosing Physical Delivery, you can either go to &quot;Orders Set
          Up&quot; and click on &quot;Integrate with Onsite Shipping Company
          Software&quot; or choose to deliver the solution with your own
          delivery method as long as you manually introduce all of the delivery
          options available by going to &quot;Orders Set Up&quot; and clicking
          on &quot;Input Allowed Shipping Destinations Manually&quot;. You can
          also go directly to these pages by clicking on the buttons below your
          table choice.
        </p>
        <br />
        <p className="text-start">
          By choosing Download Delivery, you can either go to &quot;Orders Set
          Up&quot; and click on &quot;Input One Purchase Software Solution Git
          Link&quot;, or you can go there directly by clicking on the button
          below your table choice.
        </p>
        <br />
        <p className="text-start">
          By choosing APIs, you can either configure them in
          &quot;Logistics&quot; and click on &quot;APIs&quot;, or you can go
          there directly by clicking on the button below your table choice.
        </p>
        <br />
        <p className="text-start">
          By choosing Vendor&apos;s Address, which means that the solution will
          be delivered in your address, you can click on the button below your
          table choice that allows you to input where the Shoppitto must go to
          in order for you to deliver the solution, and the available calendar
          link.
        </p>
        <br />
        <p className="text-start">
          By choosing Shoppitto&apos;s Address, which means that the solution
          will be delivered in the Shoppitto&apos;s address, you can click on
          the button below your table choice that allows you to add your
          vendor&apos;s address from where you will depart to deliver the
          solution (so that UpUnikSelf can calculate if the distance is less
          than 19 miles/30 km from the Shoppitto&apos;s address), and the
          available calendar link .
        </p>
        <br />
        <p className="text-start">
          By choosing Remote Delivery, which means that the solution will be
          delivered through a remote connection such as a video call, you can
          click on the button below your table choice that allows you to add the
          available calendar link.
        </p>
      </Description>

      <CommonLink
        href={
          routes.vendor.orderSetup.generalSolutions.individualServices.default
        }
        onClick={goBack}
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default DeliveryMethod;
export { getServerSideProps };
