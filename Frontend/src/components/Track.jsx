import { userContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
function Track() {
  const loggedData = useContext(userContext);
  const [foodItems, setFoodItems] = useState([]);
  const [food, setfood] = useState(null);
  useEffect(() => {
    console.log(food);
  }, []);
  function searchFood(e) {
    if (e.target.value.length === 0) setFoodItems([]);
    if (e.target.value.length > 0) {
      console.log(e.target.value.length);
      fetch(`http://localhost:8080/menu/${e.target.value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedData.loggedUser.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            setFoodItems(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.value.length === 0) {
      setFoodItems([]);
    }
  }

  console.log(foodItems);
  return (
    <>
      <section className="container track-container">
        <div className="search-item">
          <div className="search input">
            <label htmlFor="search" style={{ marginRight: "10px" }}>
              Search Food items
            </label>
            <input
              type="search"
              placeholder="Search Food item"
              id="search"
              onChange={searchFood}
              style={{
                textIndent: "10px",
                padding: "12px",
                width: "50%",
                fontSize: "large",
                borderRadius: "5px solid pink",
                color: "blue",
              }}
            />
          </div>
        </div>
        {foodItems.length > 0 ? (
          <div className="results">
            {foodItems.map((item) => {
              return (
                <p
                  onClick={() => {
                    setfood(item);
                  }}
                  key={item._id}>
                  {item.name}
                </p>
              );
            })}
          </div>
        ) : null}

        <div className="card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Selena_Gomez_2009.jpg"
            alt=""
            className="card-image"
          />
          <h2 className="card-title">title</h2>
          <div className="card-content">
            <p className="card-property">Protiens 230g</p>
            <p className="card-property">Carbs 30g</p>
            <p className="card-property">Fibre 98g</p>
            <p className="card-property">Fat 78g</p>
          </div>
          <button>Track</button>
        </div>
      </section>
    </>
  );
}

export default Track;
