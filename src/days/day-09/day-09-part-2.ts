import { readLine } from '../../utils/file';

type DiskMap = number[];
type File = { id: number; size: number };
type FreeSpace = { id: 'free'; size: number };
type FileSystem = (File | FreeSpace)[];

const diskMap: DiskMap = (await readLine('day-09', 'input')).split('').map(Number);

function getFileSystem(): FileSystem {
  return diskMap.map((digit, i) => ({ id: i % 2 === 0 ? i / 2 : 'free', size: digit }));
}

function compact(fileSystem: FileSystem): FileSystem {
  const compacted = structuredClone(fileSystem);

  for (let i = compacted.length - 1; i >= 0; i--) {
    if (typeof compacted[i].id === 'number') {
      const freeSpaceIndex = compacted.findIndex((fileOrFreeSpace, index) => {
        return (
          fileOrFreeSpace.id === 'free' && fileOrFreeSpace.size >= compacted[i].size && index < i
        );
      });
      if (freeSpaceIndex !== -1) {
        const file = compacted.splice(i, 1)[0];
        compacted.splice(freeSpaceIndex, 0, file);
        compacted[freeSpaceIndex + 1].size -= file.size;
        compacted.splice(i, 0, { id: 'free', size: file.size });
      }
    }
  }

  return compacted;
}

function checksum(fileSystem: FileSystem): number {
  let sum = 0;
  let block = 0;
  for (const fileOrFreeSpace of fileSystem) {
    for (let i = 0; i < fileOrFreeSpace.size; i++, block++) {
      if (typeof fileOrFreeSpace.id === 'number') {
        sum += block * fileOrFreeSpace.id;
      }
    }
  }
  return sum;
}

console.log(checksum(compact(getFileSystem())));
