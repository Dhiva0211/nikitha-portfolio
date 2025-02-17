import { FC, useState } from 'react';
import { DotsAnimation } from '@/components/loading-animations/dots-animation';
import dynamic from 'next/dynamic';
import { routes } from '@/routes';
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
const ArrowTop = dynamic(
  () =>
    import('@/components/common/icons').then(mod => ({
      default: mod.ArrowTop,
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

const orders = [
  {
    orderNumber: '[Order Number 1]',
    messages: [
      {
        sender: 'Shoppitto',
        message: 'Thank you for your order!',
        timestamp: '2023-07-15 10:00',
      },
      {
        sender: 'Vendor',
        message: 'Thank you for your order!',
        timestamp: '2023-07-15 10:00',
      },
    ],
  },
  {
    orderNumber: '[Order Number 2]',
    messages: [
      {
        sender: 'Shoppitto',
        message: 'Thank you for your order!',
        timestamp: '2023-07-15 10:00',
      },
      {
        sender: 'Vendor',
        message: 'Thank you for your order!',
        timestamp: '2023-07-15 10:00',
      },
    ],
  },
  {
    orderNumber: '[Order Number 3]',
    messages: [
      {
        sender: 'Shoppitto',
        message: 'Thank you for your order!',
        timestamp: '2023-07-15 10:00',
      },
      {
        sender: 'Vendor',
        message: 'Thank you for your order!',
        timestamp: '2023-07-15 10:00',
      },
    ],
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

const MessageCard: FC<{
  orderNumber: string;
  messages: { sender: string; message: string; timestamp: string }[];
}> = ({ orderNumber, messages }) => {
  const [actualMessages, setActualMessages] = useState(messages);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');

  const addNewMessage = e => {
    e.preventDefault();
    const newMessageObject = {
      sender: 'Vendor',
      message: newMessage,
      timestamp: new Date().toUTCString(),
    };
    setActualMessages([...actualMessages, newMessageObject]);
    setNewMessage('');
  };

  return (
    <div className="mb-4 flex flex-col overflow-hidden rounded-2xl border-4">
      <div className="flex justify-between">
        <div>
          <div className="m-4 flex items-center">
            <span className="text-xl font-bold">{orderNumber}</span>
            <span className="ml-4 text-lg font-bold">Vendor Chat</span>
          </div>
          <div className="mx-4 mb-2">
            {!showMore && (
              <button
                onClick={() => setShowMore(!showMore)}
                type="button"
                className="text-sm hover:underline"
              >
                Show More
              </button>
            )}
            {showMore && (
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="text-sm hover:underline"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center rounded-l-2xl bg-deep-sapphire">
          <ArrowTop className="size-24" svgClassName="fill-white scale-y-150" />
        </div>
      </div>

      {showMore && (
        <div className="mx-4 mt-4 space-y-4">
          {actualMessages.map((message, index) => (
            <div key={index} className="flex items-center gap-x-4">
              <div className="shrink-0">
                <div className="flex size-10 items-center justify-center rounded-lg bg-deep-sapphire text-white">
                  {message.sender.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold">{message.sender}</div>
                  <div className="text-sm text-deep-sapphire">
                    {new Date(message.timestamp).toUTCString()}
                  </div>
                </div>
                <div className="mt-1">{message.message}</div>
              </div>
            </div>
          ))}
          <form
            onSubmit={addNewMessage}
            className="mx-4 mb-4 flex justify-between gap-x-2 pb-4 pt-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a new message..."
              className="w-full rounded-md border border-deep-sapphire p-2 placeholder:text-corn-flower-blue focus:border-none"
            />
            <button className="rounded-lg border-4 bg-white p-2 text-deep-sapphire hover:bg-deep-sapphire hover:text-white">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Messages: FC = () => {
  const [messages, setMessages] = useState(orders);
  const addNewMessage = () => {
    const newMessageObject = {
      orderNumber: `[Order Number ${messages.length + 1}]`,
      messages: [
        {
          sender: 'Shoppito',
          message: 'Thank you for your order!',
          timestamp: new Date().toUTCString(),
        },
        {
          sender: 'Vendor',
          message: 'Thank you for your order!',
          timestamp: new Date().toUTCString(),
        },
      ],
    };
    setMessages([...messages, newMessageObject]);
  };
  return (
    <section className="mx-auto max-w-2xl p-4">
      <ShowWindowTitle smallTitle secondTitle="Messages to Shoppito" />

      <div className="my-6 space-y-4">
        {messages.map((order, index) => (
          <MessageCard
            key={index}
            orderNumber={order.orderNumber}
            messages={order.messages}
          />
        ))}
      </div>

      <div className="my-6 text-center">
        <button
          type="button"
          onClick={addNewMessage}
          className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        >
          Show More
        </button>
      </div>

      <CommonLink
        href={
          routes.vendor.inputOfferings.generalSolutions.individualServices
            .default
        }
      >
        <section className="m-2 p-2">Done</section>
      </CommonLink>
    </section>
  );
};

export default Messages;
export { getServerSideProps };
