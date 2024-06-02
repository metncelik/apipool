export const options = {
    scales: {
        y: {
            suggestedMin: 0,
            grid: {
                color: 'grey',
                lineWidth: .2,
            },
            ticks: {

                color: 'grey',
                font: {
                    size: 15,
                    weight: 450,
                    family:
                        "Lexend"
                },
                padding: 15,
                callback: function (value) {
                    if (value % 1000 === 0 && value != 0) return value / 1000 + 's';
                    return value % 1 === 0 ? value : null;
                }
            }
        },
        x: {
            grid: {
                lineWidth: 0
            },
            ticks: {
                color: 'grey',
                font: {
                    size: 12,
                    weight: 100,
                    family: "Lexend"
                },
                padding: 14,
                callback: function (value) {
                    return value % 3 === 0 ? value : null
                }
            }
        }
    },
    hoverRadius: 3,
    hoverBackgroundColor: 'white',
    interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: 'grey',
                font: {
                    size: 14,
                    weight: 450,
                    family: "Lexend"
                }
            }

        },
        tooltip: {
            backgroundColor: 'rgb(14, 14, 15)',
            borderColor: 'rgba(202, 202, 215, 0.141)',
            borderWidth: 2,
            padding: 15,
            cornerRadius: 10,
            boxPadding: 8,
            titleColor: 'white',
            bodyColor: 'grey',
            bodyFont: {
                size: 13,
                weight: 400,
                family: "Lexend",
            },
            bodySpacing: 3,
            callbacks: {
                labelColor: function (context) {
                    return {
                        backgroundColor: context.dataset.borderColor,
                        borderWidth: 0
                    };
                },
                

            },
            enabled: true,
            displayColors: false
        }
    }
}