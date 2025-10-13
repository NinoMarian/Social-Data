const years = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];

    const dataWorld = {
      "Facebook": [1.55,1.69,1.86,2.13,2.32,2.45,2.60,2.74,2.91,3.00,3.10],
      "YouTube": [1.20,1.40,1.50,1.80,2.00,2.30,2.60,2.80,2.90,3.00,3.10],
      "WhatsApp": [0.90,1.00,1.30,1.50,1.80,1.90,2.00,2.20,2.30,2.40,2.50],
      "Instagram": [0.40,0.70,1.00,1.10,1.30,1.50,1.80,2.00,2.20,2.30,2.40],
      "TikTok": [0.00,0.00,0.00,0.40,0.80,1.10,1.50,1.80,2.10,2.30,2.40],
      "X (Twitter)": [0.32,0.33,0.35,0.37,0.39,0.40,0.42,0.44,0.46,0.48,0.50]
    };

    const dataEurope = {
      "Facebook": [270,280,290,300,310,320,330,340,350,355,360],
      "YouTube": [250,260,270,280,290,300,310,320,330,340,350],
      "Instagram": [90,100,120,150,180,200,220,240,260,270,280],
      "WhatsApp": [200,220,240,260,280,300,320,340,350,355,360],
      "TikTok": [0,0,0,20,60,100,140,180,210,230,250],
      "X (Twitter)": [65,70,72,74,75,76,77,78,79,80,81]
    };

    const dataFrance = {
      "Facebook": [30,32,33,34.9,35,39.6,40,40,40,40,40],
      "Instagram": [6,10,13,16.7,17,24.9,29,31,32,33,34],
      "YouTube": [6,7,10,12,19,20,22,24,26,27,28],
      "WhatsApp": [1.5,8,12,15,16,19,22,25,27,28,30],
      "TikTok": [0,0,0,4,9,12,15,18,20,21,22],
      "X (Twitter)": [7,6,8,9,12,12,13,13,13,13,13]
    };

    const colors = {
      "Facebook": "#1877F2",
      "YouTube": "#FF0000",
      "Instagram": "#E1306C",
      "WhatsApp": "#25D366",
      "TikTok": "#000000",
      "X (Twitter)": "#1DA1F2"
    };

    const icons = {
      "Facebook": "icon/facebook.svg",
      "YouTube": "icon/youtube.svg",
      "Instagram": "icon/instagram.svg",
      "WhatsApp": "icon/whatsapp.svg",
      "TikTok": "icon/tiktok.svg",
      "X (Twitter)": "icon/x.svg"
    };

    function createChart(ctx, data, unit) {
      return new Chart(ctx, {
        type: "line",
        data: {
          labels: years,
          datasets: Object.keys(data).map(net => ({
            label: net,
            data: data[net],
            borderColor: colors[net],
            backgroundColor: colors[net],
            pointBackgroundColor: colors[net],
            pointRadius: 3,
            borderWidth: 2,
            tension: 0.35,
            fill: false
          }))
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: "rgba(255,255,255,0.1)" }, ticks: { color: "#fff" } },
            y: { grid: { color: "rgba(255,255,255,0.1)" }, ticks: { color: "#fff" }, title: { display: true, text: `Utilisateurs (${unit})` } }
          }
        }
      });
    }

    const chartWorld = createChart(document.getElementById("chartWorld"), dataWorld, "milliards");
    const chartEurope = createChart(document.getElementById("chartEurope"), dataEurope, "millions");
    const chartFrance = createChart(document.getElementById("chartFrance"), dataFrance, "millions");
    const charts = [chartWorld, chartEurope, chartFrance];

    function createLegend(containerId, data, chart) {
      const container = document.getElementById(containerId);
      Object.keys(data).forEach(name => {
        const item = document.createElement("div");
        item.classList.add("legend-item");
        item.innerHTML = `
          <img src="${icons[name]}" alt="${name}" style="width:20px; height:20px; object-fit:contain;">
          <span style="color:${colors[name]}; font-weight:600;">${name}</span>
        `;
        item.addEventListener("click", () => highlightNetwork(name, chart));
        container.appendChild(item);
      });
    }

    function highlightNetwork(network, chart) {
      chart.data.datasets.forEach(ds => {
        const isSelected = ds.label === network;
        ds.borderColor = isSelected ? colors[ds.label] : colors[ds.label] + "55";
        ds.backgroundColor = isSelected ? colors[ds.label] : colors[ds.label] + "33";
        ds.borderWidth = isSelected ? 3 : 2;
      });
      chart.update();
    }

    document.getElementById("resetBtn").addEventListener("click", () => {
      charts.forEach(chart => {
        chart.data.datasets.forEach(ds => {
          ds.borderColor = colors[ds.label];
          ds.backgroundColor = colors[ds.label];
          ds.borderWidth = 2;
        });
        chart.update();
      });
    });

    createLegend("legendWorld", dataWorld, chartWorld);
    createLegend("legendEurope", dataEurope, chartEurope);
    createLegend("legendFrance", dataFrance, chartFrance);