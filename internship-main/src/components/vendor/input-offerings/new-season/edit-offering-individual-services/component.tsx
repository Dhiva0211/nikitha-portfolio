import { FC, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import { routes } from '@/routes';
import { useRouter } from 'next/router';

const ShowWindowTitle = dynamic(
  () =>
    import('@/components/common/titles').then(mod => ({
      default: mod.ShowWindowTitle,
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
const Select = dynamic(
  () =>
    import('@/components/common/select').then(mod => ({
      default: mod.Select,
    })),
  {
    loading: () => <DotsAnimation />,
  },
);
const Ellipse = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.Ellipse,
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

interface ComponentProps {
  readonly edit: string | Array<string> | undefined;
}

const Component: FC<ComponentProps> = ({ edit }) => {
  const router = useRouter();
  const [calendarLinkToUse, setCalendarLinkToUse] = useState<string>('');
  const [calendarIdToUse, setCalendarIdToUse] = useState<string>('');

  const goBack = event => {
    event.preventDefault();
    router.back();
  };

  const handleCalendarLink = (link: string) => {
    setCalendarLinkToUse(link);
  };

  return (
    <section className="mt-4 sm:px-4 md:px-8 lg:px-12 xl:px-16">
      <ShowWindowTitle smallTitle secondTitle="New Season Solution" />
      <h3 className="m-2 text-center text-xl font-bold">Solution {edit}</h3>

      <InputLabelLeft
        labelToUse="First Day of New Season Solution"
        type="date"
      />
      <InputLabelLeft labelToUse="New Season Solution Name" />

      <Description>
        Please make sure your videos are of good quality, and that they are in a
        1:1 ratio. Otherwise, they will be cut to fit the 1:1 ratio. You can
        make 1:1 videos by using one of the following options: Adobe Premiere,
        iMovie + Keynote, Clipchamp, InShot, Kapwing, and VEED.io. The accepted
        video file formats are MP4, AVI and MOV in order to help you focus on
        what you sell best. Solution videos should not include sound because any
        sound will be removed.
      </Description>

      <Description>
        Click on one existing offerings to reserve it to automatically switch to
        the new season offering in the pre-selected date after it has been
        pre-approved. All orders of the previous offering will still have to be
        completed.
      </Description>

      <section className="m-2 flex">
        <video
          controls
          className="m-2 flex size-44 flex-col justify-between rounded-xl border-4 bg-white text-center font-bold"
        />
        <label
          className="m-2 my-auto cursor-pointer font-bold"
          htmlFor="video1"
        >
          Upload 20 Second Video 1 of Solution
          <input type="file" id="video1" className="hidden" />
        </label>
      </section>

      <Select
        labelToUse="Select which sub-category your solution applies to"
        options={[]}
      />
      <Description>
        Choose one of the categories in which your solution should be sold.
      </Description>

      <InputLabelLeft labelToUse="Offering Keywords" />
      <Description>
        Up to 30 keywords, no emojis Separate each keyword by a comma “,”.
      </Description>

      <h4 className="m-4 text-2xl font-bold">Optional</h4>

      <section className="flex justify-center">
        <section className="flex flex-col text-center text-deep-sapphire">
          <label htmlFor="calendarLink" className="pt-1 font-bold">
            Select which calendar link type you want to use
          </label>

          <select
            name="calendarLink"
            id="calendarLink"
            className="rounded-full border-4 text-center"
            onChange={e =>
              handleCalendarLink(calenderOptions[`${e.target.value}`].link)
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
        labelToUse="Calendar Id for this Solution"
        value={calendarIdToUse}
        onChange={e => setCalendarIdToUse(e.target.value)}
      />

      <InputLabelLeft
        labelToUse="Calendar Link for this Solution"
        value={calendarLinkToUse + calendarIdToUse}
        readOnly
      />
      <Description>
        If appropriate, add the link from where the Shoppitto will choose the
        available time to receive the solution.
      </Description>

      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.individualServices
            .newSeason.default
        }
        onClick={goBack}
      >
        <span className="text-xl font-bold">Cancel</span>
      </CommonLink>

      <CommonLink href={routes.underConstruction}>
        <span className="text-xl font-bold">Allow Pre-Orders</span>
      </CommonLink>

      <Description>
        You can only upload up to 10 New Season Solutions at a time. You can
        change any New Season Service that you want to sell, and all new New
        Season Solutions need to go through the approval process. Solutions can
        only be preordered 2 weeks before the New Season date. Orders will be
        received in the same way as Solutions which are already being sold, and
        in the order invoice there will be a message explaining that the
        delivery date is expected to be at least one day after the New Season
        begins. Make sure to review all the data referring to your new season
        offering before requesting approval. You can change it now, although you
        request approval, the only way to change it will be to delete it first.
      </Description>

      <CommonLinkNoBg
        href={
          routes.vendor.inputOfferings.generalSolutions.individualServices
            .newSeason.submit
        }
      >
        <Ellipse
          className="size-20"
          svgClassName="fill-deep-sapphire stroke-deep-sapphire"
        />
        <span className="text-xl font-bold sm:mx-auto">Request Approval</span>
      </CommonLinkNoBg>
    </section>
  );
};

export default Component;
