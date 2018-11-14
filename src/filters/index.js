
export function analyBillsType(type) {
  /*维修原因（0：离线报警；1：电磁报警；2：其他故障；3：申请维修）*/
  let text = '状态未明';
  switch (type + '') {
    case '0':
      text = '离线报警';
      break;
    case '1':
      text = '电磁报警';
      break;
    case '2':
      text = '其他故障';
      break;
    case '3':
      text = '申请维修';
      break;
  }
  return text
}

export function analyBillsStatus(status) {
  //维修状态（0：待审核；1：已处理；2：待处理）
  let text = '状态未明';
  switch (status + '') {
    case '0':
      text = '待审核';
      break;
    case '1':
      text = '已处理';
      break;
    case '2':
      text = '待处理';
      break;
  }
  return text
}
