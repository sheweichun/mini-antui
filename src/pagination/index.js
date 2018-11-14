const ellipsesItem = {
  type: 'ellipses',
  index: '',
  text: '...'          
};

Component({
  data: {
    pages: [],
    activeIndex: 1,
    totalNum: 0,
    maxPageNum: 0,
    prevPageNum: 0,
    totalPages: []
  },

  props: {
    mode: 'basic',
    nextText: 'Next',
    prevText: 'Prev',
    totalItems: 0, // total number of items
    pageSize: 5, // number of items that are shown each page
    showEllipses: false, // whether show ellipses items
    currentIndex: 1, // index of current page
    onPrevTap: () => {},
    onNextTap: () => {},
    onPageTap: () => {}
  },

  didMount() {
    this.initData();    
  },
  
  methods: {
    onPrevTap(evt) {
      const { activeIndex } = this.data;
      if (activeIndex > 1) {
        this.setData({ activeIndex: activeIndex - 1 });
        this.createPages();
        this.props.onPrevTap({
          currentIndex: this.data.activeIndex
        });
      }
    },

    onNextTap() {
      const { activeIndex, totalNum } = this.data;
      if (activeIndex < totalNum) {
        this.setData({ activeIndex: activeIndex + 1 });
        this.createPages();
        this.props.onNextTap({
          currentIndex: this.data.activeIndex
        });
      }
    },

    onPageTap(evt) {
      const { index, type } = evt.currentTarget.dataset;
      if (type !== 'ellipses') {
        const { activeIndex } = this.data;
        this.setData({ activeIndex: index });
        this.createPages();
        this.props.onPageTap({
          prevIndex: activeIndex,
          currentIndex: index
        });
      }
    },

    initData() {
      const { totalItems, pageSize, maxPageToShow, currentIndex, mode } = this.props;
      const totalNum = Math.ceil(totalItems / pageSize);
      // if maxPageToShow is not valid then use total number as max page number to show
      const maxPageNum = (maxPageToShow > 0 && maxPageToShow < totalNum) ? maxPageToShow : totalNum;
      const prevPageNum = Math.floor(maxPageNum / 2);
      const totalPages = []; // total pages array used to slice pages array
      for (let page = 1; page <= totalNum; page++) {
        totalPages.push({
          type: 'page',
          index: page,
          text: page
        });
      }
      this.setData({ activeIndex: currentIndex, totalNum, maxPageNum, prevPageNum, totalPages });
      if (mode === 'basic') {
        this.createPages();
      }
    },

    createPages() {
      const { showEllipses } = this.props;
      const { activeIndex, totalNum, maxPageNum, prevPageNum, totalPages } = this.data;
      let beginPage = activeIndex - prevPageNum;
      let endPage = beginPage + maxPageNum - 1;

      if (beginPage < 1) {
        beginPage = 1;
        endPage = maxPageNum;
      }
      if (endPage > totalNum) {
        endPage = totalNum;
        beginPage = endPage - maxPageNum + 1;
      }

      const pages = totalPages.slice(beginPage - 1, endPage).map(item => ({
        ...item,
        isActive: item.index === activeIndex
      }));

      // add ellipses page item to pages if showEllipses is true.
      if (showEllipses) {
        if (beginPage > 1) {
          pages.unshift(ellipsesItem);
        }
        if (endPage < totalNum) {
          pages.push(ellipsesItem);
        }
      }
      this.setData({ pages });
    }
  }
});