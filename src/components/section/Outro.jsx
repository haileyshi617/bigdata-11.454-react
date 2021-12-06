import React from 'react';

function Outro() {
  return (
    <div className="section regular center outro">
      <div className="container">
        <div className="summary">
          <h1>Summary</h1>
          <p>
            To conclude, food insecurity has a limited impact on the migration
            issue in the Northern Triangle region. The correlation between its
            food insecurity and migration action is not significant.{' '}
            <span className="red">
              As we can see from the survey, it’s counter intuition that the
              food insecure group tends to have a higher desire to migrate. Yet
              desire is not equal to action, as they are less likely to take
              actual action compared with the insecure group.
            </span>{' '}
            One explanation for this might be, for people with less need to
            worry about the basic need for food, they may have more resources
            and time to think of new possibilities such as migration that may
            further improve their living standards. However, these better-off
            people do not necessarily make actual plans for migration.
          </p>
          <br />
          <p>
            <span className="red">
              The migration issue is a complicated and multifaceted subject that
              requires a much wider perspective.{' '}
            </span>
            Food security shall not be considered as the only solution or even
            bargaining chip to solve the immigration issue, but rather a bottom
            line that every nation and individual shall hold and ensure. From
            the survey, it’s astonishing to see that there is still a large
            portion of people suffering from food insecurity in the triangle
            region. Ensuring basic human rights – the right to food is
            undoubtedly the first priority.
          </p>
        </div>
        <div className="sources">
          <div className="reference">
            <h1>Reference</h1>
            <ul>
              <li>
                Abuelafia, Emmanuel, Giselle Del Carmen, Marta Ruiz-Arranz. “In
                the footprints of migrants: Perspectives and experiences of
                migrants from El Salvador, Guatemala and Honduras in the United
                States.” Inter-American Development Bank: Creative Commons,
                2019.
              </li>
              <li>
                World Food Programme, “Climate crisis and economic shocks leave
                millions food insecure across Central America”, UN News, 23
                February 2021
              </li>
              <li>
                Clemens, Michael. “The Real Root Causes of America’s Border
                Crisis And How Biden Can Address Them.” Foreign Affairs. 7 June
                2021.
              </li>
            </ul>
          </div>
          <div className="data-source">
            <h1>Data Source</h1>
            <ul>
              <li>
                <a href="https://www.fao.org/faostat/en/#data/FS">
                  Prevalence of moderate and severe food insecurity in the total
                  population by nations, 2020
                </a>
              </li>
              <li>
                <a href="https://www.un.org/development/desa/pd/content/international-migrant-stock">
                  International Migrant Stock, Population Division, United
                  Nations, 2020
                </a>
              </li>
              <li>
                Anonymized data from 5000+ Household Interviews conducted by a
                joint initiative between World Food Program and the Migration
                Policy Institute and the International Organization for
                Migration. For privacy and security issue, the original dataset
                would not be shared, 2020.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Outro;
