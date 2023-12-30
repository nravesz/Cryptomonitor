import DataValue from "../../src/values/data_value";

const dataValueMock = new (<any> DataValue)() as jest.Mocked<DataValue>;

dataValueMock.evaluate = jest.fn(() => [1, 2, 30, 40, 21]);

export default dataValueMock;