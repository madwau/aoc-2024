import { repeat } from '../../utils/array';
import { readLine } from '../../utils/file';
import { sum } from '../../utils/math';
import { isNumber } from '../../utils/typescript';

type DiskMap = number[];
type FileSystem = (number | '.')[];

const diskMap: DiskMap = (await readLine('day-09', 'input')).split('').map(Number);

function getFileSystem(): FileSystem {
  return diskMap.flatMap((digit, i) => repeat([i % 2 === 0 ? i / 2 : '.'], digit));
}

function compact(fileSystem: FileSystem): FileSystem {
  return fileSystem.reduce((currentFileSystem, block, index) => {
    if (block === '.') {
      const lastNumberIndex = currentFileSystem.findLastIndex(isNumber);
      if (lastNumberIndex > index) {
        currentFileSystem[index] = currentFileSystem[lastNumberIndex];
        currentFileSystem[lastNumberIndex] = '.';
      }
    }
    return currentFileSystem;
  }, fileSystem);
}

function checksum(fileSystem: FileSystem): number {
  return sum(fileSystem.filter(isNumber).map((block, index) => index * block));
}

console.log(checksum(compact(getFileSystem())));
