export default {
  ukr: {
    header: {
      unauthorized: {
        signIn: "Ввійти",
        signUp: "Зареєструватись",
      },
      user: {
        test: "Тест",
        messages: "Повідомлення",
        profile: "Мій профіль",
        signOut: "Вийти",
      },
      admin: {
        test: "Тест",
        adminRegistration: "Реєстрація",
        adminMessages: "Чати",
        profile: "Мій профіль",
        signOut: "Вийти",
      },
      modalText: {
        title: "Ви впевнені, що хочете вийти?",
        text: "Щоб знову ввійти в профіль, Вам потрібно буде залогуватись",
        noButton: "Закрити",
        yesButton: "Так, вийти",
      },
    },
    home: {
      hero: {
        title: (
          <>
            Ми турбуємось про <span className="accent-text">ваше</span> здоров’я
          </>
        ),
        info: (
          <>
            <p>
              <b>Увага</b>. Пройшовши цей тест, Ви дізнаєтесь про стан свого
              здоров’я, а точніше - чи Ваша вага в нормі, отримаєте рекомендацію
              стосовно того, що і скільки Вам потрібно їсти, щоб підтримувати
              своє тіло в хорошій формі.
            </p>
            <p>
              Якщо хочете зберегти результат, Ви повинні спочатку ввійти в свій
              акаунт!
            </p>
          </>
        ),
        cta: "Почати тест",
      },
      perks: [
        {
          icon: "bi bi-hospital",
          title: (
            <>
              Тест <span className="accent-text light">не замінить</span> лікаря
            </>
          ),
          text: "Хоча тест має велику точність результату, але якщо у тебе існують сумніви з приводу свого здоров’я, треба звернутись  до лікаря",
        },
        {
          icon: "bi bi-apple",
          title: (
            <>
              Харчування завжди{" "}
              <span className="accent-text light">важливе</span>
            </>
          ),
          text: "Незалежно від результату, тобі буде запропонований раціон, який допоможе підтримувати хороший стан здоров’я",
        },
        {
          icon: "bi bi-capsule",
          title: (
            <>
              <span className="accent-text light">Консультація з лікарем</span>{" "}
              доступна кожному
            </>
          ),
          text: "Кожен зареєстрований користувач має право на одну безкоштовну консультацію",
        },
      ],
      cards: [
        {
          person: {
            photoUrl: "confessions/person-1.jpg",
            name: "Оксана Петровська",
            quote:
              "Мені дуже сподобався тест. Завдяки ньому я здобула впевненість в своєму тілі",
          },
          card: {
            bmi: 23.4,
            testResult: "normal",
            goodProducts: "dietOLose",
            badProducts: "dietOStopGain",
            calories: {
              maintain: 1600.8,
            },
          },
        },
        {
          person: {
            photoUrl: "confessions/person-2.jpg",
            name: "Олег Нагірняк",
            quote:
              "Дякую! Я хотів трохи підкачатись і консультація мені дійсно допомогла",
          },
          card: {
            bmi: 20.6,
            testResult: "normal",
            goodProducts: "dietALose",
            badProducts: "dietAStopGain",
            calories: {
              maintain: 2559.4,
            },
          },
        },
        {
          person: {
            photoUrl: "confessions/person-3.jpg",
            name: "Анна Кітик",
            quote:
              "Останні кілька місяців я почувалась не дуже добре, тепер знаю чому. Дякую!",
          },
          card: {
            bmi: 15.6,
            testResult: "underweight",
            goodProducts: "dietOGain",
            badProducts: "dietOStopLose",
            calories: {
              maintain: 1602.3,
              gain05: 2102.3,
              gain1: 2602.3,
            },
          },
        },
      ],
    },
    signUp: {
      title: "Реєстрація",
      inputs: {
        inputLabels: {
          loginLabel: "Логін",
          emailLabel: "Електронна пошта",
          nameLabel: "Ім'я",
          passwordLabel: "Пароль",
          confirmPasswordLabel: "Повторіть пароль",
          dateOfBirthLabel: "Дата народження",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
          emailPlaceholder: "youremail@gmail.com",
          namePlaceholder: "Микита Тарасенко",
        },
      },
      cta: "Зареєструватись",
      linkText: "Вже маєте профіль?",
      link: "Ввійти",
      info: (
        <>
          Ми прагнемо, щоб наші користувачі ставилися до нас з максимальною
          довірою. Ми завжди враховуємо те, що авторизаційні дані наших
          користувачів використовуються тільки для надійної авторизації та
          безпеки їхніх профілів. Ми не дозволимо злочинні дії та незаконне
          використання введених користувачем авторизаційних даних.
        </>
      ),
      messageText: {
        200: "Реєстрація успішна. Перевірте вказану електронну пошту для підтвердження. Поки пошту не буде підтверджено, Ви не зможете ввійти у свій профіль.",
        403: "Користувач з цим логіном чи поштою вже існує",
      },
    },
    signIn: {
      title: "Вхід",
      inputs: {
        inputLabels: {
          loginLabel: "Логін",
          passwordLabel: "Пароль",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
        },
      },
      cta: "Ввійти",
      linkText: "Ще не маєте профіль?",
      link: "Зареєструйтесь",
      info: (
        <>
          Ми прагнемо, щоб наші користувачі ставилися до нас з максимальною
          довірою. Ми завжди враховуємо те, що авторизаційні дані наших
          користувачів використовуються тільки для надійної авторизації та
          безпеки їхніх профілів. Ми не дозволимо злочинні дії та незаконне
          використання введених користувачем авторизаційних даних.
        </>
      ),
      errorText: "Неправильний логін або пароль",
    },
    profile: {
      title: "Мій профіль",
      noUser: "Користувача не існує",
      inputs: {
        inputLabels: {
          loginLabel: "Логін",
          emailLabel: "Електронна пошта",
          nameLabel: "Ім'я",
          passwordLabel: "Пароль",
          confirmPasswordLabel: "Повторіть пароль",
          dateOfBirthLabel: "Дата народження",
          roleLabel: "Роль",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
          emailPlaceholder: "youremail@gmail.com",
          namePlaceholder: "Микита Тарасенко",
        },
      },
      cta: "Зберегти зміни",
      goBack: "Повернутись назад",
      uploadImage: "Завантажити зображення",
      showTestResult: "Результат тесту",
      noResultText: "Збереженого результату тесту немає",
      closeTestResult: "Закрити",
      info: (
        <>
          Ми прагнемо, щоб наші користувачі ставилися до нас з максимальною
          довірою. Ми завжди враховуємо те, що авторизаційні дані наших
          користувачів використовуються тільки для надійної авторизації та
          безпеки їхніх профілів. Ми не дозволимо злочинні дії та незаконне
          використання введених користувачем авторизаційних даних.
        </>
      ),
      modalText: {
        title: "Ви впевнені, що хочете зберегти зміни свого профілю?",
        text: "Якщо у Вас є сумніви, то краще перевірте введені дані.",
        noButton: "Закрити",
        yesButton: "Так, зберегти зміни",
      },
      messageText: {
        200: "Ваш профіль успішно змінено",
        202: "Зміни було внесено. На вказану електронну пошту має прийти лист із підтвердженням",
        400: "Ніяких змін не було внесено",
        401: "Новий пароль не співпадає з підтвердженням",
        403: "Пошта вже використовується",
      },
    },
    messages: {
      enableApplication: "Знайти співрозмовника",
      disableApplication: "Не шукати співрозмовника",
      titleWithLogin: "З Вами розмовляє ",
      titleWithoutLogin: "У Вас немає співрозмовника",
      defaultMessage: "Зробіть запит на пошук співрозмовника в меню зліва",
      messagePlaceholder: "Ваше повідомлення...",
    },
    adminRegistration: {
      title: "Реєстрація нового користувача",
      inputs: {
        inputLabels: {
          loginLabel: "Логін",
          emailLabel: "Електронна пошта",
          nameLabel: "Ім'я",
          passwordLabel: "Пароль",
          confirmPasswordLabel: "Повторіть пароль",
          dateOfBirthLabel: "Дата народження",
          roleLabel: "Роль",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
          emailPlaceholder: "youremail@gmail.com",
          namePlaceholder: "Микита Тарасенко",
        },
      },
      cta: "Додати користувача",
      info: (
        <>
          <p>Пояснення ролей:</p>
          <br />
          <p>
            <b>USER</b> - звичайний користувач, клієнт.
          </p>
          <p>
            <b>DOCTOR</b> - лікар, може вступати в переписку з клієнтами.
          </p>
          <p>
            <b>ADMIN</b> - адміністратор, має всі права.
          </p>
        </>
      ),
      modalText: {
        title: "Ви впевнені, що хочете створити нового користувача?",
        text: "Якщо у Вас є сумніви, то краще перевірте введені дані, особливо роль користувача.",
        noButton: "Закрити",
        yesButton: "Так, створити",
      },
      messageText: {
        success: "Нового користувача успішно зареєстровано",
        error: "Користувач з цим логіном чи поштою вже існує",
      },
    },
    adminMessages: {
      title: "Керування чатами",
      users: "Клієнти",
      doctors: "Лікарі",
      userInputPlaceholder: "Логін клієнта",
      doctorInputPlaceholder: "Логін лікаря",
      cta: "Створити чат-кімнату",
      modalText: {
        title: "Ви впевнені, що хочете створити нову чат-кімнату?",
        text: "Після цього неможливо буде створити ще одну чат-кімнату з вибраним клієнтом.",
        noButton: "Закрити",
        yesButton: "Так, створити",
      },
      messageText: {
        success: "Новий чат успішно створено",
        error: "Неможливо створити чат з цими користувачами",
      },
    },
    validation: {
      required: "Це поле необхідно заповнити",
      min: "Мінімальна довжина цього поля - ",
      max: "Максимальна довжина цього поля - ",
      confirm: "Пароль повинен співпадати із введеним вище",
      email:
        "Електронна пошта повинна мати такий вигляд: 'youremail@gmail.com'",
      login:
        "Логін має бути написаний латинницею та може містити лише цифри та наступні символи: - _ .",
    },
    testResult: {
      title: "Висновок за результатами тесту",
      goToHome: "На головну сторінку",
      saveButton: "Зберегти результат тесту",
      modalText: {
        title: "Ви впевнені, що хочете зберегти результат?",
        text: "Якщо Ви вже маєте збережений результат, його буде видалено",
        noButton: "Закрити",
        yesButton: "Так, зберегти",
      },
      messageText: {
        200: "Результат було збережено в профілі",
        400: "Результат не було збережено",
      },
    },
    resultCard: {
      bmiLabel: "ІМТ",
      resultLabel: "Результат",
      resultVariants: {
        underweight: "У Вас недостатня вага. Рекомендується її набрати.",
        normal: "Ваша вага в межах норми. Ви можете просто її підтримувати.",
        overweight: "У Вас надлишкова вага. Рекомендується її скинути.",
        obese:
          "У Вас ожиріння 1-го ступеню. Строго рекомендується скинути вагу. Будь ласка, піклуйтесь про своє здоров'я.",
        extremelyObese:
          "У Вас ожиріння 2-го ступеню. Будь ласка, проконсультуйтеся зі своїм лікарем і якомога швидше " +
          "почніть лікування.",
        morbidlyObese:
          "У Вас ожиріння 3-го ступеню. Це смертельно небезпечно. Зараз для Вас важливо якнайшвидше зв'язатися " +
          "з лікарем, щоб запобігти серйозним наслідкам.",
      },
      dietLabel: "Рекомендований раціон",
      dietVariants: {
        dietOStopGain: [
          "Пшениця (клейковина)",
          "Кукурудза",
          "Звичайна овочева квасоля",
          "Боби темні",
        ],
        dietOStopLose: [
          "Печінка",
          "Червоне м'ясо",
          "Капуста листова",
          "Капуста спаржева (брокколі)",
        ],
        dietOLose: [
          "Бура водорость",
          "Морські продукти",
          "Йодована сіль",
          "Печінка",
        ],
        dietOGain: [
          "Пшениця (клейковина)",
          "Кукурудза",
          "Звичайна овочева квасоля",
          "Боби темні",
        ],
        dietAStopGain: [
          "М'ясо",
          "Молочна їжа",
          "Звичайна овочева квасоля",
          "Лімська квасоля",
        ],
        dietAStopLose: ["Соєві продукти", "Овочі", "Ананаси"],
        dietALose: ["Рослинні олії", "Соєві продукти", "Овочі", "Ананаси"],
        dietAGain: [
          "М'ясо",
          "Молочна їжа",
          "Звичайна овочева квасоля",
          "Лімська квасоля",
        ],

        dietBStopGain: [
          "Кукурудза",
          "Сочевиця",
          "Земляні горіхи (арахіс)",
          "Насіння кунжуту",
        ],
        dietBStopLose: [
          "Зелені овочі",
          "М'ясо",
          "Яйця",
          "Молочні продукти (з низькою жирністю)",
        ],
        dietBLose: [
          "Зелені овочі",
          "М'ясо",
          "Яйця",
          "Молочні продукти (з низькою жирністю)",
        ],
        dietBGain: [
          "Пшениця",
          "Гречка",
          "Настій (чай) з солодкового (лакричного) кореня",
        ],

        dietABStopGain: [
          "Червоне м'ясо",
          "Звичайна овочева квасоля",
          "Лімська квасоля",
          "Насіння",
        ],
        dietABStopLose: ["Тофу", "Морські продукти", "Зелені овочі", "Ананаси"],
        dietABLose: [
          "Тофу",
          "Морські продукти",
          "Молочні продукти",
          "Зелені овочі",
        ],
        dietABGain: ["Кукурудза", "Гречка", "Пшениця", "Молочні продукти"],
      },
      caloriesLabel: "Розрахунок споживання калорій на день",
      caloriesVariants: {
        maintain:
          "Для підтримання ваги без змін Вам потрібно стільки калорій в день: ",
        lose05:
          "Для скидання 0.5 кг за тиждень Вам потрібно стільки калорій в день: ",
        lose1:
          "Для скидання 1 кг за тиждень Вам потрібно стільки калорій в день: ",
        gain05:
          "Для набирання 0.5 кг за тиждень Вам потрібно стільки калорій в день: ",
        gain1:
          "Для набирання 1 кг за тиждень Вам потрібно стільки калорій в день: ",
      },
    },
    testCard: {
      genderLabel: "Стать",
      ageLabel: "Вік",
      heightLabel: "Ріст",
      weightLabel: "Вага",
      chestSizeLabel: "Обхват грудей",
      waistSizeLabel: "Обхват талії",
      hipSizeLabel: "Обхват стегон",
      bloodTypeLabel: "Група крові",
      genderText: {
        MALE: "Чоловік",
        FEMALE: "Жінка",
      },
    },
    test: {
      back: "Назад",
      next: "Далі",
      complete: "Завершити",
      questions: [
        {
          name: "gender",
          id: 1,
          imgUrl: "test/test_1.jpg",
          title: "Вкажіть свою стать",
          description:
            "Потрібно ввести свою біологічну стать (яка була записана у Вашому свідоцтві про народження), з усією повагою до небінарних користувачів.",
          type: "radio",
          answers: [
            {
              value: "MALE",
              text: "Чоловік",
            },
            {
              value: "FEMALE",
              text: "Жінка",
            },
          ],
        },
        {
          name: "age",
          id: 2,
          imgUrl: "test/test_2.jpg",
          title: "Вкажіть свій вік",
          description:
            "Для проходження тесту необхідно бути старшим за 14 років. Це вимога, яка існує через формули для розрахунків, що не підходять для дітей.",
          type: "input",
          restrictions: {
            min: 14,
            max: 130,
          },
        },
        {
          name: "height",
          id: 3,
          imgUrl: "test/test_3.jpg",
          title: "Вкажіть свій ріст (в сантиметрах, см)",
          description:
            "Деякі загальні правила вимірювання зросту: вимірювання повинно проводитися без взуття, взуття може вплинути на точність вимірювання; вимірювати зріст потрібно на рівній поверхні, наприклад, на підлозі чи спеціальній мітці; людина повинна стояти прямо, з головою, спиною та стопами прилягаючими до стіни. Частини тіла, такі як п'яти, сильно згинати не потрібно; міркувати потрібно від верхівки голови до п'ят.",
          type: "input",
          restrictions: {
            min: 1,
            max: 400,
          },
        },
        {
          name: "weight",
          id: 4,
          imgUrl: "test/test_4.jpg",
          title: "Вкажіть свою вагу (в кілограмах, кг)",
          description:
            "Щоб правильно виміряти свою вагу, треба виконати кілька простих дій: будьте обережні й рівномірно розподіляйте свою вагу на ноги обох ніг, щоб отримати точний результат; рекомендується зважуватися зранку, до прийому їжі.",
          type: "input",
          restrictions: {
            min: 1,
            max: 1000,
          },
        },
        {
          name: "chestSize",
          id: 5,
          imgUrl: "test/test_5.jpg",
          title: "Вкажіть обхват грудей (в сантиметрах, см)",
          description:
            "Щоб виміряти обхват грудей, потрібно виконати наступні кроки: візьміть стрічку для вимірювання і встаньте перед дзеркалом з прямою поставою; обгорніть стрічку навколо грудей в найширшій частині; впевніться, що стрічка не занадто тісна або занадто вільна.",
          type: "input",
          restrictions: {
            min: 1,
            max: 500,
          },
        },
        {
          name: "waistSize",
          id: 6,
          imgUrl: "test/test_6.jpg",
          title: "Вкажіть обхват талії (в сантиметрах, см)",
          description:
            "Вимірювання обхвату талії - це процес вимірювання довжини навколо найвужчої частини живота.",
          type: "input",
          restrictions: {
            min: 1,
            max: 500,
          },
        },
        {
          name: "hipSize",
          id: 7,
          imgUrl: "test/test_7.jpg",
          title: "Вкажіть обхват стегон (в сантиметрах, см)",
          description:
            "Правильне місце під час вимірювання - це зазвичай найширша частина стегна, що знаходиться на відстані приблизно 20 см від талії.",
          type: "input",
          restrictions: {
            min: 1,
            max: 500,
          },
        },
        {
          name: "bloodType",
          id: 8,
          imgUrl: "test/test_8.jpg",
          title: "Вкажіть групу крові (О = 1, А = 2, В = 3, АВ = 4)",
          description:
            "Для визначення своєї групи крові потрібно провести клінічний аналіз крові: медичні лабораторії роблять спеціальні аналізи крові, щоб визначити групу крові. Цей метод є найточнішим і надійнішим.",
          type: "select",
          answers: [
            {
              value: "O",
              text: "O",
            },
            {
              value: "A",
              text: "A",
            },
            {
              value: "B",
              text: "B",
            },
            {
              value: "AB",
              text: "AB",
            },
          ],
        },
      ],
    },
    errorPage: {
      title: "Помилка",
      error: {
        400: "Неправильний запит. Ви намагаєтесь перейти на недоступну сторінку.",
        401: "Ця сторінка не доступна неавторизованим користувачам.",
        403: "У Вас немає прав переглядати цю сторінку.",
        404: "Сторінку не знайдено.",
      },
      cta: "На головну сторінку",
    },
    verificationPage: {
      title: "Верифікація профілю",
      infoText: {
        profile: {
          ok: "Ваш профіль активовано. Тепер ви можете ввійти в свій профіль",
          bad: "Токен для верифікації неправильний або термін його придатності закінчився",
        },
        email: {
          ok: "Вашу пошту було змінено",
          bad: "Токен для верифікації неправильний або термін його придатності закінчився",
        },
      },
      cta: {
        profile: {
          ok: "Ввійти",
          bad: "Зареєструватись",
        },
        email: {
          ok: "Перейти у профіль",
          bad: "Перейти у проофіль",
        },
      },
      image: {
        ok: "/verification/email_happy.png",
        bad: "/verification/email_sad.png",
      },
    },
    footer: (
      <>
        <b>©HealthiU 2023</b>. Всі права на матеріали що розміщені на сайті
        належать власникам сайту або відповідним авторам чи правовласникам. При
        використанні будь-яких матеріалів з даного сайту на інших інтернет
        ресурсах, обов'язково вказуйте посилання на наш сайт
      </>
    ),
  },
  eng: {
    header: {
      unauthorized: {
        signIn: "Sign In",
        signUp: "Sign Up",
      },
      user: {
        test: "Test",
        messages: "Messages",
        profile: "My Profile",
        signOut: "Sign Out",
      },
      admin: {
        test: "Test",
        adminRegistration: "Registration",
        adminMessages: "Chats",
        profile: "My Profile",
        signOut: "Sign Out",
      },
      modalText: {
        title: "Are you sure that you want to sign out?",
        text: "If you do, you'll need to sign in again next time",
        noButton: "Close",
        yesButton: "Yes, sign out",
      },
    },
    home: {
      hero: {
        title: (
          <>
            We care about <span className="accent-text">your</span> health
          </>
        ),
        info: (
          <>
            <p>
              <b>Attention</b>. Having passed this test, you will find out about
              your own health condition, or rather - whether your weight is
              normal. You will receive diet recommendations to maintain your
              body in good shape
            </p>
            <p>
              If you want to save result, you should first enter sign in into
              your account!
            </p>
          </>
        ),
        cta: "Start test",
      },
      perks: [
        {
          icon: "bi bi-hospital ",
          title: (
            <>
              Test <span className="accent-text light"> won't replace </span> a
              doctor
            </>
          ),
          text: "Although there is a big precision in test result, but if you have doubts about your own health, it is necessary to visit a doctor",
        },
        {
          icon: "bi bi-apple ",
          title: (
            <>
              Food is always{" "}
              <span className="accent-text light"> important </span>
            </>
          ),
          text: "Regardless from the result, you will be proposed diet which will help you maintain a healthy body",
        },
        {
          icon: "bi bi-capsule ",
          title: (
            <>
              <span className="accent-text light">
                Consultation with a doctor
              </span>{" "}
              is available to everyone
            </>
          ),
          text: "Each registered user is entitled to one free consultation",
        },
      ],
      cards: [
        {
          person: {
            photoUrl: "confessions/person-1.jpg",
            name: "Anne White",
            quote:
              "I liked this test very much. It helped me appreciate my body",
          },
          card: {
            bmi: 23.4,
            testResult: "normal",
            goodProducts: "dietOLose",
            badProducts: "dietOStopGain",
            calories: {
              maintain: 1600.8,
            },
          },
        },
        {
          person: {
            photoUrl: "confessions/person-2.jpg",
            name: "Oliver Smith",
            quote:
              "Thank you! I wanted to buff up a bit and consultation really helped me!",
          },
          card: {
            bmi: 20.6,
            testResult: "normal",
            goodProducts: "dietALose",
            badProducts: "dietAStopGain",
            calories: {
              maintain: 2559.4,
            },
          },
        },
        {
          person: {
            photoUrl: "confessions/person-3.jpg",
            name: "Diana Evans",
            quote:
              "I was feeling unwell for the last couple of months and now I know why. Thank you very much!",
          },
          card: {
            bmi: 15.6,
            testResult: "underweight",
            goodProducts: "dietOGain",
            badProducts: "dietOStopLose",
            calories: {
              maintain: 1602.3,
              gain05: 2102.3,
              gain1: 2602.3,
            },
          },
        },
      ],
    },
    signUp: {
      title: "Sign Up",
      inputs: {
        inputLabels: {
          loginLabel: "Login",
          emailLabel: "Email",
          nameLabel: "Name",
          passwordLabel: "Password",
          confirmPasswordLabel: "Confirm password",
          dateOfBirthLabel: "Date of birth",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
          emailPlaceholder: "youremail@gmail.com",
          namePlaceholder: "John Taylor",
        },
      },
      cta: "Sign Up",
      linkText: "Already have a profile?",
      link: "Sign In",
      info: (
        <>
          We strive for our users to have the biggest trust in us. We always
          take into account that authorization data of our users is used only
          for reliable authorization and security of their profiles. We don't
          permit any criminal actions or illegal use of out users' authorization
          data to take place.
        </>
      ),
      messageText: {
        200: "Registration was successful. Check your email for confirmation. Unless the email is confirmed, you won't be able to sign in.",
        403: "User with this login or email already exists",
      },
    },
    signIn: {
      title: "Sign In",
      inputs: {
        inputLabels: {
          loginLabel: "Login",
          passwordLabel: "Password",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
        },
      },
      cta: "Sign In",
      linkText: "Don't have a profile yet?",
      link: "Sign Up",
      info: (
        <>
          We strive for our users to have the biggest trust in us. We always
          take into account that authorization data of our users is used only
          for reliable authorization and security of their profiles. We don't
          permit any criminal actions or illegal use of out users' authorization
          data to take place.
        </>
      ),
      errorText: "Invalid login or password",
    },
    profile: {
      title: "My Profile",
      noUser: "User doesn't exist",
      inputs: {
        inputLabels: {
          loginLabel: "Login",
          emailLabel: "Email",
          nameLabel: "Name",
          passwordLabel: "Password",
          confirmPasswordLabel: "Confirm password",
          dateOfBirthLabel: "Date of birth",
          roleLabel: "Role",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
          emailPlaceholder: "youremail@gmail.com",
          namePlaceholder: "John Taylor",
        },
      },
      cta: "Save changes",
      goBack: "Go back",
      uploadImage: "Upload new image",
      showTestResult: "Show test result",
      noResultText: "There is no saved test result",
      closeTestResult: "Close",
      info: (
        <>
          We strive for our users to have the biggest trust in us. We always
          take into account that authorization data of our users is used only
          for reliable authorization and security of their profiles. We don't
          permit any criminal actions or illegal use of out users' authorization
          data to take place.
        </>
      ),
      modalText: {
        title: "Are you sure that you want to save changes to your profile?",
        text: "If you have any doubts, better check entered data before saving changes.",
        noButton: "Close",
        yesButton: "Yes, save changes",
      },
      messageText: {
        200: "The profile has been changed",
        202: "Changes have been applied. An email confirmation should be sent to the provided email address",
        400: "No changes have been made",
        401: "New password was not confirmed correctly",
        403: "This email is already in use by someone else",
      },
    },
    messages: {
      enableApplication: "Find a new chat",
      disableApplication: "Stop searching for a new chat",
      titleWithLogin: "You are speaking with ",
      titleWithoutLogin: "You have no one to speak to right now",
      defaultMessage:
        "Make a request to find a new chat on the left side of the screen",
      messagePlaceholder: "Your message ...",
    },
    adminRegistration: {
      title: "Registration",
      inputs: {
        inputLabels: {
          loginLabel: "Login",
          emailLabel: "Email",
          nameLabel: "Name",
          passwordLabel: "Password",
          confirmPasswordLabel: "Confirm password",
          dateOfBirthLabel: "Date of birth",
          roleLabel: "Role",
        },
        inputPlaceholders: {
          loginPlaceholder: "login0123",
          emailPlaceholder: "youremail@gmail.com",
          namePlaceholder: "John Taylor",
        },
      },
      cta: "Add new user",
      info: (
        <>
          <p> Explanation of roles:</p>
          <br />
          <p>
            <b>USER</b> - simple user, a customer.
          </p>
          <p>
            <b>DOCTOR</b> - doctor, can consult customers.
          </p>
          <p>
            <b>ADMIN</b> - administrator, has all the rights
          </p>
        </>
      ),
      modalText: {
        title: "Are you sure that you want to create a new user?",
        text: "If you have any doubts, better check entered data before saving changes, especially role.",
        noButton: "Close",
        yesButton: "Yes, create a new user",
      },
      messageText: {
        success: "New user was registered successfully",
        error: "User with this login or email already exists",
      },
    },
    adminMessages: {
      title: "Chat Management",
      users: "Customers",
      doctors: "Doctors",
      userInputPlaceholder: "Customer login",
      doctorInputPlaceholder: "Doctor login",
      cta: "Create a new chat room",
      modalText: {
        title: "Are you sure that you want to create a new chat room?",
        text: "It is impossible to create more chat rooms with this customer after this.",
        noButton: "Close",
        yesButton: "Yes, create a new chat room",
      },
      messageText: {
        success: "New chatroom has been successfully created",
        error: "Impossible to create chatroom for these users",
      },
    },
    validation: {
      required: "This field is necessary to fill",
      min: "Minimal length of the field is ",
      max: "Maximal length of the field is ",
      confirm: "Password should match the one entered above",
      email: "Email should look like this: 'youremail@gmail.com'",
      login:
        "Login has to be in Latin and can only contain numbers and the following symbols : - _ . ",
    },
    testResult: {
      title: "Result of the completed test",
      goToHome: "To the home page",
      saveButton: "Save test result",
      modalText: {
        title: "Are you sure that you want to save result?",
        text: "If you already have a result saved to your profile, it will be gone",
        noButton: "Close",
        yesButton: "Yes, save result",
      },
      messageText: {
        200: "The result has been saved to your profile",
        400: "The result hasn't been saved",
      },
    },
    resultCard: {
      bmiLabel: "BMI",
      resultLabel: "Result",
      resultVariants: {
        underweight:
          "You have insufficient weight. It is recommended to gain weight.",
        normal:
          "Your weight is within limits of normal one. You can simply continue to maintain it.",
        overweight:
          "You have excessive weight. It is recommended to lose weight.",
        obese:
          "You are obese having the 1st degree. It is strictly recommended to lose weight. Please, take care of your health.",
        extremelyObese:
          "You are obese having the 2nd degree. Please, visit your doctor ASAP.",
        morbidly_obese:
          "You are obese having the 3rd degree. It is a deadly condition. Please, visit your doctor ASAP to prevent dangerous consequences from happening.",
      },
      dietLabel: "Recommended diet",
      dietVariants: {
        dietOStopGain: [
          "Wheat (gluten)",
          "Corn",
          "Ordinary vegetable beans",
          "Black beans",
        ],
        dietOStopLose: [
          "Liver",
          "Red meat",
          "Letter cabbage",
          "Cabbage (asparagus)",
        ],
        dietOLose: ["Storm seaweed", "Seafood", "Iodized salt", "Liver"],
        dietOGain: [
          "Wheat (gluten)",
          "Corn",
          "Ordinary vegetable beans",
          "Dark beans",
        ],
        dietAStopGain: [
          "Meat",
          "Dairy",
          "Ordinary vegetable beans",
          "Limska beans",
        ],
        dietAStopLose: ["Soy products", "Vegetables", "Pineapples"],
        dietALose: [
          "Vegetable oils",
          "Soy products",
          "Vegetables",
          "Pineapples",
        ],
        dietAGain: [
          "Meat",
          "Dairy",
          "Ordinary vegetable beans",
          "Limska beans",
        ],

        dietBStopGain: ["Corn", "Lentil", "Peanuts", "Sesame seeds"],
        dietBStopLose: [
          "Green vegetables",
          "Meat",
          "Eggs",
          "Dairy (with low fatness)",
        ],
        dietBLose: [
          "Green vegetables",
          "Meat",
          "Eggs",
          "Dairy (with low fatness)",
        ],
        dietBGain: ["Wheat", "Buckwheat", "Licorice tea"],

        dietABStopGain: [
          "Red meat",
          "Ordinary vegetable beans",
          "Limska beans",
          "Seeds",
        ],
        dietABStopLose: ["Tofu", " Seafood ", "Green vegetables", "Pineapples"],
        dietABLose: ["Tofu", "Seafood", "Dairy", "Green vegetables"],
        dietABGain: ["Corn", "Buckwheat", "Wheat", "Dairy products"],
      },
      caloriesLabel: "Calculation of calories consumption per day",
      caloriesVariants: {
        maintain:
          "To maintain weight you need to consume this much calories per day:",
        lose05:
          "To lose 0.5 kg by week you need to consume this much calories per day:",
        lose1:
          "To lose 1 kg by week you need to consume this much calories per day:",
        gain05:
          "To gain 0.5 kg by week you need to consume this much calories per day:",
        gain1:
          "To gain 1 kg by week you need to consume this much calories per day:",
      },
    },
    testCard: {
      genderLabel: "Gender",
      ageLabel: "Age",
      heightLabel: "Height",
      weightLabel: "Weight",
      chestSizeLabel: "Chest size",
      waistSizeLabel: "Waist size",
      hipSizeLabel: "Hip size",
      bloodTypeLabel: "bloodType",
      genderText: {
        MALE: "Male",
        FEMALE: "Female",
      },
    },
    test: {
      back: "Back",
      next: "Next",
      complete: "Complete",
      questions: [
        {
          name: "gender",
          id: 1,
          imgUrl: "test/test_1.jpg",
          title: "Choose your gender",
          description:
            "It is necessary to choose your biological gender (what was recorded in your birth certificate), with all due respect to non-binary users.",
          type: "radio",
          answers: [
            {
              value: "MALE",
              text: "Male",
            },
            {
              value: "FEMALE",
              text: "Female",
            },
          ],
        },
        {
          name: "age",
          id: 2,
          imgUrl: "test/test_2.jpg",
          title: "Enter your age",
          description:
            "To use this test it is necessary to be 14 y.o. or older. Calculator can not be used by children.",
          type: "input",
          restrictions: {
            minutes: 14,
            max: 130,
          },
        },
        {
          name: "height",
          id: 3,
          imgUrl: "test/test_3.jpg",
          title: "Enter your height (in centimeters, cm)",
          description:
            "Some general rules for height measurement: measurement must be held without shoes, shoes can influence precision of measurement; to measure height it is necessary to stand on flat surface, for example on the floor; a person must stand straight, with head, back and feet adjacent to walls; measure from top of the head to bottom of the heel.",
          type: "input",
          restrictions: {
            min: 1,
            max: 400,
          },
        },
        {
          name: "weight",
          id: 4,
          imgUrl: "test/test_4.jpg",
          title: "Enter your weight (in kilograms, kg)",
          description:
            "To properly measure your weight, you need to perform a few simple actions: be careful and evenly distribute your weight on both legs to get an accurate result; it is recommended to weigh yourself in the morning, before eating.",
          type: "input",
          restrictions: {
            min: 1,
            max: 1000,
          },
        },
        {
          name: "chestSize",
          id: 5,
          imgUrl: "test/test_5.jpg",
          title: "Enter your chest size (in centimeters, cm)",
          description:
            "To measure your chest circumference, you need to follow these steps: take a measuring tape and stand in front of a mirror with good posture; wrap the tape around the widest part of your chest; make sure that the tape is not too tight or too loose.",
          type: "input",
          restrictions: {
            min: 1,
            max: 500,
          },
        },
        {
          name: "waistSize",
          id: 6,
          imgUrl: "test/test_6.jpg",
          title: "Enter your waist size (in centimeters, cm)",
          description:
            "Measuring waist circumference is the process of measuring the length around the narrowest part of the abdomen.",
          type: "input",
          restrictions: {
            min: 1,
            max: 500,
          },
        },
        {
          name: "hipSize",
          id: 7,
          imgUrl: "test/test_7.jpg",
          title: "Enter your hips size (in centimeters, cm)",
          description:
            "Correct placement during measurement is usually the widest part of the thigh, located approximately 20 cm from the waist.",
          type: "input",
          restrictions: {
            min: 1,
            max: 500,
          },
        },
        {
          name: "bloodType",
          id: 8,
          imgUrl: "test/test_8.jpg",
          title: "Choose your blood type (O = 1, A = 2, B = 3, AB = 4)",
          description:
            "To determine your blood type, a clinical blood analysis is required. Medical laboratories perform specialized blood tests to determine the blood type. This method is the most accurate and reliable.",
          type: "select",
          answers: [
            {
              value: "O",
              text: "O",
            },
            {
              value: "A",
              text: "A",
            },
            {
              value: "B",
              text: "B",
            },
            {
              value: "AB",
              text: "AB",
            },
          ],
        },
      ],
    },
    errorPage: {
      title: "Error",
      error: {
        400: "Bad request. You are trying too access unavailable page.",
        401: "This page is accessible only to authorized users.",
        403: "You don't have the rights to view this page.",
        404: "The page you were looking for can't be found.",
      },
      cta: "To the home page",
    },
    verificationPage: {
      title: "Profile Verification",
      infoText: {
        profile: {
          ok: "The profile has been activated. Now you can sign in",
          bad: "Verification token is invalid or has expired",
        },
        email: {
          ok: "The email has been changed.",
          bad: "Verification token is invalid or has expired",
        },
      },
      cta: {
        profile: {
          ok: "Sign In",
          bad: "Sign Up",
        },
        email: {
          ok: "Go to my profile",
          bad: "Go to my profile",
        },
      },
      image: {
        ok: "/verification/email_happy.png",
        bad: "/verification/email_sad.png",
      },
    },
    footer: (
      <>
        <b>©HealthiU 2023</b>. All rights to materials posted on the website
        belong to the owners of the website or the respective authors or owners
        of the rights. When using any materials from this website on other
        Internet resources, be sure to indicate a link to our website.
      </>
    ),
  },
};
