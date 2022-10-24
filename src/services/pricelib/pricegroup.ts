import PriceItem from './priceitem';

export default class PriceGroup {
  public PriceItems: PriceItem[];

  public PaxTypeCount = 0;

  private TOTALFLAG = '合计';

  public TotalAmount = 0;

  public SummaryItem: PriceItem = {} as PriceItem;

  constructor(pricItems: PriceItem[]) {
    this.PriceItems = pricItems;
    this.addSummary();
  }

  addSummary() {
    this.SummaryItem = new PriceItem(this.TOTALFLAG);
    this.SummaryItem.paxCount = 0;
    this.PriceItems.push(this.SummaryItem);
  }

  addItem(paxType: string, count?: number) {
    const itemIdx = this.PriceItems.findIndex((item) => item.ptc === paxType);
    if (itemIdx > -1) {
      this.PriceItems[itemIdx].add(count);
    } else {
      const item = new PriceItem(paxType);
      item.paxCount = count || 1;
      this.PriceItems.splice(0, 0, item);
    }
    this.calculator();
  }

  prune(record: Record<string, number>) {
    const notExists = this.PriceItems.filter((p) => !record[p.ptc]);
    if (notExists.length === 0) {
      return;
    }
    notExists.forEach((p) => {
      if (p.ptc === this.TOTALFLAG) {
        return;
      }
      this.reduceItem(p.ptc, -1);
    });
  }

  reduceItem(paxType: string, count?: number) {
    const itemIdx = this.PriceItems.findIndex((item) => item.ptc === paxType);
    if (itemIdx === -1) {
      return;
    }
    if (this.PriceItems[itemIdx].paxCount <= 1 || count === -1) {
      this.PriceItems.splice(itemIdx, 1);
    } else {
      this.PriceItems[itemIdx].reduce();
    }
    this.calculator();
  }

  calculator() {
    this.summaryReset();
    this.PaxTypeCount = 0;
    this.PriceItems.forEach((item) => {
      if (item.ptc === this.TOTALFLAG) {
        return;
      }
      item.calculate();
      this.SummaryItem.totalAmount += item.totalAmount;
      this.SummaryItem.paxCount += item.paxCount;
      this.PaxTypeCount += 1;
    });
    this.TotalAmount = this.SummaryItem.totalAmount;
  }

  summaryReset() {
    this.SummaryItem.totalAmount = 0;
    this.SummaryItem.paxCount = 0;
  }

  removeTotal() {
    const itemIdx = this.PriceItems.findIndex(
      (item) => item.ptc === this.TOTALFLAG
    );
    if (itemIdx === -1) {
      return;
    }
    this.PriceItems.splice(itemIdx, 1);
  }
}
