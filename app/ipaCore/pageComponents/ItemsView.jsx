import React, { useEffect, useState } from "react";

import { IafItemSvc } from "@dtplatform/platform-api";
import { ScriptHelper } from "@invicara/ipa-core/modules/IpaUtils";

const ItemsView = (props) => {
  const [collections, setCollections] = useState();
  const [currentCollection, setCurrentCollection] = useState();
  const [items, setItems] = useState();
  const [searchValue, setSearchValue] = useState(undefined);

  useEffect(() => {
    // Fetch the AirGradient API data
    async function fetchAirGradientData() {
      try {
        const response = await fetch(
          "https://api.airgradient.com/public/api/v1/world/locations/89/measures/current"
        );
        const data = await response.json();
        console.log("🚀 ~ fetchAirGradientData ~ data:", data)
      } catch (error) {
        console.error("Error fetching AirGradient data:", error);
      }
    }
    fetchAirGradientData();

    getCollections();
  }, []);

  useEffect(() => {
    getItems();
  }, [currentCollection]);

  const getCollections = async () => {
    // UNCOMMENT FOR LESSON:  DISPLAY ITEMS ON YOUR PAGE
    IafItemSvc.getAllNamedUserItems({
      query: {
        _itemClass: "NamedUserCollection",
        _userType: props.handler.config._userType,
      },
    }).then((colls) => {
      setCollections(colls);
    });
  };

  const getItems = async () => {
    if (currentCollection) {
      // UNCOMMENT FOR LESSON:  DISPLAY ITEMS ON YOUR PAGE
      IafItemSvc.getRelatedItems(currentCollection).then((items) => {
        setItems(items);
      });

      // UNCOMMENT FOR LESSON:  USING SCRIPTTYPES AND RUNNING SCRIPTS
      let items = await ScriptHelper.executeScript(
        props.handler.config.search.script,
        {
          field: props.handler.config.search.field,
          value: searchValue,
          userItemId: currentCollection,
        }
      );

      setItems(items);
    }
  };

  return (
    <div>
      <div>
        {collections && (
          <select
            name="collections"
            id="collections"
            value={currentCollection}
            onChange={(e) => setCurrentCollection(e.target.value)}
          >
            <option key={"empty"} value={null}></option>
            {collections.map((c) => (
              <option key={c._id} value={c._userItemId}>
                {c._name}
              </option>
            ))}
          </select>
        )}
      </div>
      {props.handler.config.search && (
        <div>
          <label>
            Search:
            <input
              type="text"
              name="searchVal"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={getItems}>
              {props.handler.config.search.script}
            </button>
          </label>
        </div>
      )}
      <div>
        <div>----Handler----</div>
        <pre>{JSON.stringify(props.handler, null, 3)}</pre>
        {items && (
          <div>
            ---- {items && items._list ? items._list.length : "0"} Items of{" "}
            {items ? items._total : "0"}----
          </div>
        )}
        {items && <pre>{JSON.stringify(items._list, null, 3)}</pre>}
      </div>
    </div>
  );
};

export default ItemsView;
