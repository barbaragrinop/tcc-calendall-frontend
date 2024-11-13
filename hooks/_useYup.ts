import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, Resolver } from 'react-hook-form';
import { pt } from 'yup-locales';


export function useYup<T extends FieldValues>(schemaCreator?: (yupInstance: typeof yup) => yup.AnyObjectSchema) {
    yup.setLocale(pt)

    if (schemaCreator) {
        const schema = schemaCreator(yup)

        const resolver = yupResolver(schema) as Resolver<T>

        return {
            yup, resolver
        }
    }

    return {
        yup
    }
}