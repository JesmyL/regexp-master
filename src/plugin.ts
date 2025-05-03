import md5 from 'md5';
import { PluginUtils } from './PluginUtils';
import { TransformProcess } from './TransformProcess';
import { regExpMasterVitePlugin as pluginMaker } from './model';

export const regExpMasterVitePlugin: typeof pluginMaker = pluginOptions => {
  const pluginUtils = new PluginUtils(pluginOptions);

  return {
    name: 'regExpMasterVitePlugin',
    enforce: 'pre',
    watchChange: async (src: string, change: { event: 'create' | 'update' | 'delete' }) => {
      if (pluginUtils.checkIsInvalidSrcToTransform(src)) return;

      const { fileSrc, modelFilePath } = pluginUtils.takeFilePaths(src);

      if (change.event === 'delete') {
        pluginUtils.removeKnownFile(modelFilePath, fileSrc);
        return;
      }

      let content = await pluginUtils.readFileAsync(src);
      const importNameMatch = pluginUtils.matchImport(content);

      if (importNameMatch === null) {
        pluginUtils.removeKnownFile(modelFilePath, fileSrc);
        return;
      }

      try {
        const ut = new TransformProcess(pluginOptions, {
          importNameMatch,
          content,
          fileMD5: md5(fileSrc),
        });

        const result = ut.process();

        if (result === null) {
          pluginUtils.removeKnownFile(modelFilePath, fileSrc);
          return;
        }

        pluginUtils.saveKnownFile(fileSrc);
        pluginUtils.writeFileContent(modelFilePath, result.types);
      } catch (error) {
        console.error(error);
      }
    },
  };
};
