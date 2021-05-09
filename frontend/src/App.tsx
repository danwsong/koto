import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import './App.css';

interface Item {
  id: string;
  content: string;
}

function setItemsPersist(items: Item[]) {
  localStorage.setItem('items', JSON.stringify(items));
}

function getItemsPersist() {
  return JSON.parse(localStorage.getItem('items') ?? '[]') as Item[];
}

interface ListItemProps {
  item: Item;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

function ListItem(props: ListItemProps) {
  const { item, items, setItems } = props;

  function handleDelete() {
    const newItems = items.filter((item) => item.id !== props.item.id);
    setItems(newItems);
    setItemsPersist(newItems);
  }

  return (
    <div
      className="card flex-row align-items-center justify-content-between px-3 py-2 mb-3 shadow-sm"
      style={{ height: '4rem' }}
    >
      <span>{item.content}</span>
      <div className="d-flex flex-row align-items-center">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleDelete}
        >
          <BsCheck />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [items, setItems] = useState<Item[]>(getItemsPersist());
  const [contentText, setContentText] = useState('');

  function handleSubmit() {
    if (contentText === '') {
      return;
    }
    const newItems = [...items, { id: uuid(), content: contentText }];
    setItems(newItems);
    setItemsPersist(newItems);
    setContentText('');
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col my-3">
          <div className="card p-3 mb-3 shadow-sm sticky-top">
            <h1 className="text-center mb-3">Koto</h1>
            <form
              onSubmit={(event) => {
                handleSubmit();
                event.preventDefault();
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="What would you like to do today?"
                value={contentText}
                onChange={(event) => setContentText(event.target.value)}
              />
            </form>
          </div>
          <div>
            {
              <TransitionGroup appear>
                {items.map((item) => (
                  <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames="list-item"
                  >
                    <ListItem item={item} items={items} setItems={setItems} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            }
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default App;
