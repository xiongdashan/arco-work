import moment from 'momnet';

export default function DateFormate(date: any, format: string): string {
  return moment(date).format(format);
}
