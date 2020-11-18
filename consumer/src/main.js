import { consumer } from './consumer';
import { Logger } from './logger';

const port = process.env.PORT || 3000;

consumer.listen(port, () => Logger.info(`Server running in port ${port}`));
