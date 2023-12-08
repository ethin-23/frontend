import { Text } from "@radix-ui/themes";
const supported_features = [
  {
    id: 2,
    question: "Private Transactions",
    answer:
      "Send and receive tokens without exposing your wallet address or the amount sent.",
  },
  {
    id: 3,
    question: "Zero-knowledge proofs",
    answer: "Guarantees your identity remains confidential.",
  },
  {
    id: 4,
    question: "Advanced anonymity",
    answer:
      "Makes it virtually impossible to trace your transactions back to you",
  },
  {
    id: 5,
    question: "StarkNet security",
    answer: "Built on the robust and secure StarkNet blockchain",
  },
];

const planned_features = [
  {
    id: 1,
    question: "Stark Proofs",
    answer: "Generate STARK proofs to validate data",
  },
];

export const FAQ = () => {
  return (
    <div className="mt-8">
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-3xl font-bold tracking-tight">
          Supported Features
        </h2>
        <div className="mb-2 mt-8">
          <dl className="divide-y divide-gray-200">
            {supported_features.map(({ question, answer, id }) => (
              <div
                className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                key={id}
              >
                <Text className="text-base font-bold md:col-span-5">
                  {question}
                </Text>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <Text className="text-base">{answer}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* <div className="mt-4">
          <h2 className="my-8 block text-3xl font-bold tracking-tight">
            Upcoming Features 🚀
          </h2>
          <div className="mb-2 mt-8">
            <dl className="divide-y divide-gray-200">
              {planned_features.map(({ question, answer, id }) => (
                <div
                  className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                  key={id}
                >
                  <Text
                    className="text-base font-medium md:col-span-5"
                    color="crimson"
                  >
                    {question}
                  </Text>
                  <dd className="mt-2 md:col-span-7 md:mt-0">
                    <Text className="text-base">{answer}</Text>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div> */}
      </div>
    </div>
  );
};
