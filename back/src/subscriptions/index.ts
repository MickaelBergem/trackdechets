import { prisma } from "../generated/prisma-client";
import { companiesSubscriptionCallback } from "./companies";
import { formsSubscriptionCallback } from "./forms";

type Subscription = {
  iterable: () => Promise<AsyncIterator<any>>;
  callback: (payload: { value: any } & any) => Promise<void>;
};

const subscriptions: Subscription[] = [
  {
    iterable: () => prisma.$subscribe.form(),
    callback: formsSubscriptionCallback
  },
  {
    iterable: () => prisma.$subscribe.company(),
    callback: companiesSubscriptionCallback
  }
];

const activeSubscriptions: AsyncIterator<any>[] = [];

export function initSubscriptions() {
  subscriptions.map(async sub => {
    try {
      const asyncIterator = await sub.iterable();
      activeSubscriptions.push(asyncIterator);

      while (true) {
        const payload = await asyncIterator.next();
        if (payload.done) {
          break;
        }

        sub.callback(payload.value);
      }
    } catch (err) {
      console.error("Error while setting up or triggering subscription", err);
    }
  });
}

export function closeSubscriptions() {
  return Promise.all(
    activeSubscriptions
      .map(async asyncIterator => {
        await asyncIterator.return(true);
        return null;
      })
      .filter(Boolean)
  );
}
