import { create } from 'zustand'

export const useNodeDataStore = create((set, get) => ({
    shapesData: {},
    currentPage: 0,
    pagesData: [],
    size: [],
    textdata: [],
    selectedNodeId: '',
    selectedArrowId: '',
    chartData: [],
    copiedNodes: [],

    setShapesData: (shapesData) => set({ shapesData }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setPagesData: (pagesData) => set({ pagesData }),
    setAllData: (size, textdata, chartData) => set({ size, textdata, chartData }),
    setSize: (id, size) => {
        const index = get().size.findIndex(item => item.id === id)

        if (index < 0) {
            set({ size: [...get().size, { id, ...size }] })
        } else {
            const newSize = [...get().size];
            newSize[index] = size
            newSize[index].id = id
            set({ size: newSize })
        }
    },
    onTextChange: (id, value) => {
        const index = get().textdata.findIndex(item => item.id === id)
        const inputKey = [Object.keys(value)[0]];
        const inputValue = [Object.values(value)[0]];

        if (index < 0) {
            set({ textdata: [...get().textdata, { id, ...value }] })
        } else {
            const newTextData = [...get().textdata];
            newTextData[index][inputKey] = inputValue[0]
            set({ textdata: newTextData })
        }
    },
    setSelectedNodeId: (id) => set({ selectedNodeId: id }),
    setSelectedArrowId: (id) => set({ selectedArrowId: id }),
    setChartData: (id, value) => {
        const index = get().chartData.findIndex(item => item.id === id)
        const inputKey = [Object.keys(value)[0]];
        const inputValue = [Object.values(value)[0]];

        if (index < 0) {
            set({ chartData: [...get().chartData, { id, ...value }] })
        } else {
            const newChartData = [...get().chartData];
            newChartData[index][inputKey] = inputValue[0]
            set({ chartData: newChartData })
        }
    },
    setCopiedNodes: (data) => set({ copiedNodes: data }),
    setUploadedData: (size, textdata, chartData) => set({
        size: size || [],
        textdata: textdata || [],
        chartData: chartData || [],
    })
}))