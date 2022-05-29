import { OpRefCustomers } from '@/services/crm';
import { OpRefCustomersVo } from '@/services/crmmodule';
import { SelectItem } from '@/services/sharedmodles';

export default class OpSelectCus {
  private sltedVal: string | null;

  private defaultVal: string | null;

  public CustomerItems: SelectItem[] = [];

  public SltedSup: SelectItem | null = {} as SelectItem;

  constructor(sltedVal: string | null, defaultVal: string | null) {
    this.sltedVal = sltedVal;
    this.defaultVal = defaultVal;
  }

  async loadData(val?: string) {
    this.CustomerItems.splice(0, this.CustomerItems.length);
    const items = await OpRefCustomers<OpRefCustomersVo[]>({ key: val });
    items.forEach((c) => {
      this.CustomerItems.push({
        value: c.value,
        label: `${c.name}/${c.owner.user_name}`,
        extra: {
          ownerId: c.owner.ownerId,
        },
      });
    });
  }

  setSltSupVal(val: string | null) {
    if (!val || val.length === 0) {
      this.SltedSup = null;
    }
    const item = this.CustomerItems.find((c) => c.value === val);
    if (!item) {
      this.SltedSup = null;
    }
    this.SltedSup = item as SelectItem;
  }

  async init() {
    await this.loadData();
    if (!this.sltedVal || this.sltedVal.length === 0) {
      return;
    }
    this.setSltSupVal(this.defaultVal);
  }
}
