export default {
  chatApplications: {
    userApplications: [
      {
        login: "homchick",
        color: "pink",
      },
      {
        login: "homhom",
        color: "green",
      },
    ],
    doctorApplications: [
      {
        login: "doctor1",
        color: "orange",
      },
      {
        login: "doctor2",
        color: "blue",
      },
    ],
  },
  chats: [
    {
      login: "homka",
      color: "blue",
    },
    {
      login: "homs-homs",
      color: "pink",
    },
    {
      login: "homsick",
      color: "orange",
    },
  ],
  messages: [
    {
      id: 1,
      sender_login: "homka",
      recipient_login: "user",
      content: "hello hello hello world",
      timestamp: "14:23:44",
      status: true,
    },
    {
      id: 2,
      sender_login: "homka",
      recipient_login: "user",
      content: "hi hi",
      timestamp: "14:23:59",
      status: true,
    },
    {
      id: 3,
      sender_login: "user",
      recipient_login: "homka",
      content: "hello world",
      timestamp: "14:25:43",
      status: true,
    },
    {
      id: 4,
      sender_login: "user",
      recipient_login: "homka",
      content:
        "yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes",
      timestamp: "14:25:59",
      status: false,
    },
    {
      id: 5,
      sender_login: "user",
      recipient_login: "homsick",
      content: "we are fairies we are winx",
      timestamp: "14:11:20",
      status: false,
    },
  ],
  resultInfo: {
    bmi: 15.6,
    result: "underweight",
    goodProducts: "dietOGain",
    badProducts: "dietOStopLose",
    calories: {
      maintain: 1602.3,
      gain05: 2102.3,
      gain1: 2602.3,
    },
  },
};
