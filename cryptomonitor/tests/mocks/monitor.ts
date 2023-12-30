import Monitor from "../../src/monitor"

const monitorMock = new (<any> Monitor)() as jest.Mocked<Monitor>;

monitorMock.getCurrency = jest.fn();

export default monitorMock;