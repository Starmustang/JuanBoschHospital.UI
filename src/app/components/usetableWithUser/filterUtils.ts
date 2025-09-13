// filterUtils.ts
// Reusable TanStack Table filter utilities

/**
 * Factory for a global filter function that searches multiple columns.
 * @param columnsToSearch Array of column keys to search
 * @returns TanStack Table global filter function
 */
/**
 * Gets a nested property value from an object using a path string like 'brand.brandName'
 * @param obj The object to get the value from
 * @param path The path to the property, e.g. 'brand.brandName'
 * @returns The value at the path or undefined if not found
 */
const getNestedValue = (obj: any, path: string): any => {
    if (!obj || !path) return undefined;
    
    const parts = path.split('.');
    let current = obj;
    
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }
    
    return current;
  };
  
  export const makeGlobalFilterFn = (columnsToSearch: string[]) =>
    (row: any, columnId: string, filterValue: string) => {
      const search = filterValue.toLowerCase();
      return columnsToSearch.some((col) => {
        // Handle nested properties like 'brand.brandName'
        const value = getNestedValue(row.original, col);
        return String(value || '').toLowerCase().includes(search);
      });
    };
  