import { Logger } from './logger';
import { provider } from './provider';

const port = process.env.PORT || 3001;

provider.listen(port, () => Logger.info(`Provider running in port ${port}`));
