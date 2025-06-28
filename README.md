# Завдання. Книга контактів з бекендом

## 🎯 Мета

Рефакторинг застосунку **«Книга контактів»**, що вже використовує Redux Toolkit. Видали логіку **Redux Persist**. Натомість додай **запити до бекенду**, який ти створиш на **mockapi.io**.

---

## 📦 Backend на mockapi.io

1. Зареєструйся на [mockapi.io](https://mockapi.io)
2. Створи новий проект
3. Створи ресурс `/contacts`
4. У кожного контакту будуть: `id`, `name`, `number`
5. Скопіюй базовий endpoint для використання в axios

---

## 📁 Структура Redux

Файли в папці `src/redux`:

- `store.js` — створення стору
- `contactsSlice.js` — логіка контактів (extraReducers)
- `filtersSlice.js` — логіка фільтра
- `contactsOps.js` — асинхронні операції з бекендом

---

## 🧱 Стан Redux

```js
{
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
  filters: {
    name: "",
  },
}
```

---

## ⚙️ `contactsOps.js` — асинхронні операції

Оголоси через `createAsyncThunk`:

```js
// GET
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// POST
export const addContact = createAsyncThunk("contacts/addContact", async (newContact, thunkAPI) => {
  try {
    const response = await axios.post("/contacts", newContact);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// DELETE
export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
```

---

## 🧠 `contactsSlice.js`

- Не використовуємо поле `reducers`
- Усі дії в `extraReducers`
- Опрацювання всіх станів (`pending`, `fulfilled`, `rejected`) для кожної операції

```js
initialState: {
  items: [],
  loading: false,
  error: null,
}
```

### Селектори:

- `selectContacts`
- `selectLoading`
- `selectError`
- `selectFilteredContacts` (мемоізований)

```js
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
);
```

---

## 🔍 `filtersSlice.js`

- Поле `name`
- reducer: `changeFilter`
- Селектор: `selectNameFilter`

```js
export const selectNameFilter = state => state.filters.name;
```

---

## 🧩 `store.js`

- **Вилучити все пов’язане з Redux Persist**
- Імпортуємо редюсери `contactsReducer`, `filtersReducer`
- Використовуємо `configureStore`

```js
const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});
```

---

## 🧪 `main.jsx`

- Компонент `App` обгортаємо в `<Provider store={store}>`
- **Без PersistGate**

```jsx
<Provider store={store}>
  <App />
</Provider>
```

---

## 🧩 `App.jsx`

- Імпортуємо `useDispatch`, `useEffect`
- Під час монтування викликаємо `dispatch(fetchContacts())`

```js
useEffect(() => {
  dispatch(fetchContacts());
}, [dispatch]);
```

---

## 📃 `ContactList.jsx`

- **Не приймає пропсів**
- Використовує `useSelector(selectFilteredContacts)`
- **Жодного фільтрування у самому компоненті!**

---

## ✅ Checklist

- [x] Код Redux Persist **видалено**
- [x] Підключено mockapi.io
- [x] Всі операції (`fetch`, `add`, `delete`) реалізовано з `axios` і `createAsyncThunk`
- [x] Оброблено `loading` та `error`
- [x] Використано мемоізовані селектори
- [x] `App.jsx` виконує `fetchContacts`
- [x] Жодні дані не передаються пропсами до `ContactList`

--- 

> 📌 За необхідності: заміни базовий `axios` URL у `contactsOps.js` через `axios.defaults.baseURL = 'https://your-api.mockapi.io/api/v1'`
